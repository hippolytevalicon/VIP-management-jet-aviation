// src/context/VIPDataContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Passenger, Request, CabinZone, PassengerHistory, Seat, Notification } from '../types';
import { mockCabinZones, mockSeats } from '../data/mockData';


interface VIPDataContextType {
  passengers: Passenger[];
  requests: Request[];
  cabinZones: CabinZone[];
  passengerHistory: PassengerHistory[];
  seats: Seat[];
  notifications: Notification[];
  updatePassenger: (updatedPassenger: Passenger) => void;
  updateRequest: (updatedRequest: Request) => void;
  updateCabinZone: (updatedZone: CabinZone) => void;
  updateSeat: (updatedSeat: Seat) => void;
  addRequest: (newRequest: Omit<Request, 'id' | 'timestamp'>) => void;
  assignSeat: (passengerId: string, seatId: string) => void;
  resetAllData: () => void;
  addPassengerWithSeat: (passenger: Passenger, seatId: string) => void; // New function
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationAsRead: (notificationId: string) => void;
  clearNotifications: (type?: 'request' | 'emergency' | 'flight', seatId?: string) => void;
}

const VIPDataContext = createContext<VIPDataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PASSENGERS: 'vip-passengers',
  REQUESTS: 'vip-requests',
  CABIN_ZONES: 'vip-cabin-zones',
  PASSENGER_HISTORY: 'vip-passenger-history',
  SEATS: 'vip-seats',
  NOTIFICATIONS: 'vip-notifications'
} as const;

export const VIPDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [cabinZones, setCabinZones] = useState<CabinZone[]>([]);
  const [passengerHistory, setPassengerHistory] = useState<PassengerHistory[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Initial data load only
  useEffect(() => {
    try {
      const storedPassengers = localStorage.getItem(STORAGE_KEYS.PASSENGERS);
      const storedRequests = localStorage.getItem(STORAGE_KEYS.REQUESTS);
      const storedSeats = localStorage.getItem(STORAGE_KEYS.SEATS);
      const storedNotifications = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);

      setPassengers(storedPassengers ? JSON.parse(storedPassengers) : []);
      setRequests(storedRequests ? JSON.parse(storedRequests) : []);
      setSeats(storedSeats ? JSON.parse(storedSeats) : mockSeats);
      setNotifications(storedNotifications ? JSON.parse(storedNotifications) : []);
      setCabinZones(mockCabinZones);
    } catch (error) {
      console.error('Error loading initial data:', error);
      setPassengers([]);
      setRequests([]);
      setSeats(mockSeats);
      setNotifications([]);
      setCabinZones(mockCabinZones);
    }
  }, []);

  const updatePassenger = (updatedPassenger: Passenger) => {
    try {
      const newPassengers = [...passengers];
      const existingIndex = newPassengers.findIndex(p => p.id === updatedPassenger.id);
      
      if (existingIndex >= 0) {
        newPassengers[existingIndex] = updatedPassenger;
      } else {
        newPassengers.push(updatedPassenger);
      }
      
      setPassengers(newPassengers);
      localStorage.setItem(STORAGE_KEYS.PASSENGERS, JSON.stringify(newPassengers));
    } catch (error) {
      console.error('Error in updatePassenger:', error);
    }
  };

  const assignSeat = (passengerId: string, seatId: string) => {
    try {
      // Find the passenger
      const passenger = passengers.find(p => p.id === passengerId);
      if (!passenger) {
        console.error('Passenger not found:', passengerId);
        return;
      }
  
      // Update the seat status
      const newSeats = seats.map(seat => 
        seat.id === seatId 
          ? {
              ...seat,
              status: 'occupied' as const,
              assignedPassengerId: passengerId
            }
          : seat
      );
  
      // Update passenger with seat reference
      const updatedPassenger = {
        ...passenger,
        currentSeat: seatId
      };
  
      const newPassengers = passengers.map(p => 
        p.id === passengerId ? updatedPassenger : p
      );
  
      // Update state
      setSeats(newSeats);
      setPassengers(newPassengers);
  
      // Update storage
      localStorage.setItem(STORAGE_KEYS.SEATS, JSON.stringify(newSeats));
      localStorage.setItem(STORAGE_KEYS.PASSENGERS, JSON.stringify(newPassengers));
  
    } catch (error) {
      console.error('Error in assignSeat:', error);
    }
  };

  const addPassengerWithSeat = (passenger: Passenger, seatId: string) => {
    try {
      // Update passengers array
      const newPassengers = [...passengers, passenger];
      
      // Update seats array
      const newSeats = seats.map(seat => 
        seat.id === seatId 
          ? {
              ...seat,
              status: 'occupied' as const,
              assignedPassengerId: passenger.id
            }
          : seat
      );

      // Update both states at once
      setPassengers(newPassengers);
      setSeats(newSeats);

      // Update localStorage
      localStorage.setItem(STORAGE_KEYS.PASSENGERS, JSON.stringify(newPassengers));
      localStorage.setItem(STORAGE_KEYS.SEATS, JSON.stringify(newSeats));

      console.log('Added passenger with seat:', {
        passenger,
        seatId,
        newPassengers,
        newSeats
      });
    } catch (error) {
      console.error('Error in addPassengerWithSeat:', error);
      throw error;
    }
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

  const updateSeat = (updatedSeat: Seat) => {
    const newSeats = seats.map(s => 
      s.id === updatedSeat.id ? updatedSeat : s
    );
    setSeats(newSeats);
    localStorage.setItem(STORAGE_KEYS.SEATS, JSON.stringify(newSeats));
  };

  const addRequest = (newRequest: Omit<Request, 'id' | 'timestamp'>) => {
    const request: Request = {
      ...newRequest,
      id: `R${Date.now()}`,
      timestamp: new Date().toISOString()
    };
  
    const newRequests = [...requests, request];
    setRequests(newRequests);
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(newRequests));
  
    // Add notification
    if (request.type === 'emergency') {
      addNotification({
        type: 'emergency',
        message: `Emergency request from Seat ${seats.find(s => s.assignedPassengerId === request.passengerId)?.id}`,
        seatId: seats.find(s => s.assignedPassengerId === request.passengerId)?.id,
        requestId: request.id
      });
    } else {
      addNotification({
        type: 'request',
        message: `New ${request.type} request from Seat ${seats.find(s => s.assignedPassengerId === request.passengerId)?.id}`,
        seatId: seats.find(s => s.assignedPassengerId === request.passengerId)?.id,
        requestId: request.id
      });
    }
  };


  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    try {
      const newNotification: Notification = {
        ...notification,
        id: `N${Date.now()}`,
        timestamp: new Date().toISOString(),
        read: false
      };

      const updatedNotifications = [newNotification, ...notifications];
      setNotifications(updatedNotifications);
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  };

  const clearNotifications = (type?: 'request' | 'emergency' | 'flight', seatId?: string) => {
    try {
      let updatedNotifications = [...notifications];
      
      if (type) {
        if (seatId) {
          // Clear specific notifications for a seat
          updatedNotifications = notifications.filter(n => 
            !(n.type === type && n.seatId === seatId)
          );
        } else {
          // Clear all notifications of a type
          updatedNotifications = notifications.filter(n => n.type !== type);
        }
      } else {
        // Clear all notifications
        updatedNotifications = [];
      }

      setNotifications(updatedNotifications);
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };

const markNotificationAsRead = (notificationId: string) => {
  const updatedNotifications = notifications.map(notification =>
    notification.id === notificationId
      ? { ...notification, read: true }
      : notification
  );

  setNotifications(updatedNotifications);
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updatedNotifications));
};





  const resetAllData = () => {
    try {
      // Create clean seat structure
      const baseSeats = mockSeats.map(seat => ({
        ...seat,
        status: 'available' as const,
        assignedPassengerId: undefined
      }));

      // Reset all state
      setPassengers([]);
      setRequests([]);
      setSeats(baseSeats);
      setNotifications([]);

      // Clear and reset localStorage
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });

      // Set clean data in localStorage
      localStorage.setItem(STORAGE_KEYS.SEATS, JSON.stringify(baseSeats));
      localStorage.setItem(STORAGE_KEYS.PASSENGERS, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify([]));

      return true;
    } catch (error) {
      console.error('Error during reset:', error);
      return false;
    }
  };

  return (
    <VIPDataContext.Provider value={{
      passengers,
      requests,
      cabinZones,
      passengerHistory,
      seats,
      notifications,
      updatePassenger,
      updateRequest,
      updateCabinZone,
      updateSeat,
      addRequest,
      assignSeat,
      addPassengerWithSeat,
      resetAllData,
      addNotification,
      clearNotifications,
      markNotificationAsRead
    }}>
      {children}
    </VIPDataContext.Provider>
  );
};

export const useVIPData = () => {
  const context = useContext(VIPDataContext);
  if (context === undefined) {
    throw new Error('useVIPData must be used within a VIPDataProvider');
  }
  return context;
};