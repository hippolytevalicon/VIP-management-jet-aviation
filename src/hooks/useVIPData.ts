/*
 custom hook that handles all the VIP data - it's basically the old version that got replaced
 by the context version (VIPDataContext).
 
 it still works but probably shouldn't use it, the context version has more features
 (like notifications)
 
 used to have some auto-refresh every 2 seconds but that was causing issues
 with the new notification system
 
 what it does:
 - loads/saves all the passenger and request data from localStorage
 - has the basic CRUD operations for passengers, requests etc
 - uses mock data for the cabin and seat layout

 todo: delete this file once we're sure we won't need any of the features in it
 most of this code is now in VIPDataContext.tsx but with more features
*/


import { useState, useEffect } from 'react';
import { Passenger, Request, CabinZone, Seat } from '../types';
import { mockCabinZones, mockSeats } from '../data/mockData';

interface VIPData {
  passengers: Passenger[];
  requests: Request[];
  cabinZones: CabinZone[];
  seats: Seat[];
  updatePassenger: (updatedPassenger: Passenger) => void;
  updateRequest: (updatedRequest: Request) => void;
  updateCabinZone: (updatedZone: CabinZone) => void;
  addRequest: (newRequest: Omit<Request, 'id' | 'timestamp'>) => void;
  assignSeat: (passengerId: string, seatId: string) => void;
  resetAllData: () => void;
}

const STORAGE_KEYS = {
  PASSENGERS: 'vip-passengers',
  REQUESTS: 'vip-requests',
  CABIN_ZONES: 'vip-cabin-zones',
  SEATS: 'vip-seats',
} as const;

export const useVIPData = (): VIPData => {
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [cabinZones, setCabinZones] = useState<CabinZone[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);

  //initial data load
  useEffect(() => {
    loadDataFromStorage();
  }, []);

  //real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      loadDataFromStorage();
    }, 2000); //2s

    return () => clearInterval(interval);
  }, []);

  const loadDataFromStorage = () => {
    try {
      //load passenger data from localStorage
      const storedPassengers = localStorage.getItem(STORAGE_KEYS.PASSENGERS);
      const storedRequests = localStorage.getItem(STORAGE_KEYS.REQUESTS);

      setPassengers(storedPassengers ? JSON.parse(storedPassengers) : []);
      setRequests(storedRequests ? JSON.parse(storedRequests) : []);

      //mock data for cabins and seats
      setCabinZones(mockCabinZones);
      setSeats(mockSeats);

      //ensure localStorage has the latest data
      localStorage.setItem(STORAGE_KEYS.CABIN_ZONES, JSON.stringify(mockCabinZones));
      localStorage.setItem(STORAGE_KEYS.SEATS, JSON.stringify(mockSeats));
    } catch (error) {
      console.error('Error loading data:', error);

      setPassengers([]);
      setRequests([]);
      setCabinZones(mockCabinZones);
      setSeats(mockSeats);
    }
  };

  const updatePassenger = (updatedPassenger: Passenger) => {
    const newPassengers = passengers.map(p => 
      p.id === updatedPassenger.id ? updatedPassenger : p
    );
    if (!newPassengers.find(p => p.id === updatedPassenger.id)) {
      newPassengers.push(updatedPassenger);
    }
    setPassengers(newPassengers);
    localStorage.setItem(STORAGE_KEYS.PASSENGERS, JSON.stringify(newPassengers));
  };

  const updateRequest = (updatedRequest: Request) => {
    const newRequests = requests.map(r => 
      r.id === updatedRequest.id ? updatedRequest : r
    );
    setRequests(newRequests);
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(newRequests));
  };

  const updateCabinZone = (updatedZone: CabinZone) => {
    const newZones = cabinZones.map(z => 
      z.id === updatedZone.id ? updatedZone : z
    );
    setCabinZones(newZones);
    localStorage.setItem(STORAGE_KEYS.CABIN_ZONES, JSON.stringify(newZones));
  };

  const addRequest = (newRequest: Omit<Request, 'id' | 'timestamp'>) => {
    const request: Request = {
      ...newRequest,
      id: `R${requests.length + 1}`,
      timestamp: new Date().toISOString()
    };
    const newRequests = [...requests, request];
    setRequests(newRequests);
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(newRequests));
  };

  const assignSeat = (passengerId: string, seatId: string) => {
    //update seat status
    const newSeats = seats.map(seat => {
      if (seat.id === seatId) {
        return {
          ...seat,
          status: (passengerId ? 'occupied' : 'available') as 'occupied' | 'available' | 'reserved',
          assignedPassengerId: passengerId || undefined
        };
      }
      return seat;
    });
    setSeats(newSeats);
    localStorage.setItem(STORAGE_KEYS.SEATS, JSON.stringify(newSeats));

    //update passenger seat
    if (passengerId) {
      const newPassengers = passengers.map(p => 
        p.id === passengerId ? { ...p, currentSeat: seatId } : p
      );
      setPassengers(newPassengers);
      localStorage.setItem(STORAGE_KEYS.PASSENGERS, JSON.stringify(newPassengers));
    }
  };

  const resetAllData = () => {
    try {
      //reset seats back to mockdata
      const resetSeats = mockSeats.map(seat => ({
        ...seat,
        status: 'available' as const,
        assignedPassengerId: undefined
      }));
  
      //update states
      setSeats(resetSeats);
      setPassengers([]);
      setRequests([]);
  
      localStorage.setItem(STORAGE_KEYS.SEATS, JSON.stringify(resetSeats));
      localStorage.setItem(STORAGE_KEYS.PASSENGERS, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify([]));
    } catch (error) {
      console.error('Error resetting data:', error);
    }
  };

  return {
    passengers,
    requests,
    cabinZones,
    seats,
    updatePassenger,
    updateRequest,
    updateCabinZone,
    addRequest,
    assignSeat,
    resetAllData
  };
};