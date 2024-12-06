import React, { useState } from 'react';
import { Seat, Passenger, Request } from '../../types';
import { useVIPData } from '../../context/VIPDataContext';

interface CabinLayoutProps {
  onSeatClick: (seatId: string) => void;
  selectedSeat: string | null;
}

const CabinLayout: React.FC<CabinLayoutProps> = ({ onSeatClick, selectedSeat }) => {
  const { seats, passengers, requests } = useVIPData();
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null);

  const getPassengerForSeat = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    if (seat?.assignedPassengerId) {
      return passengers.find(p => p.id === seat.assignedPassengerId);
    }
    return null;
  };

  const getRequestsForSeat = (seatId: string) => {
    const passenger = getPassengerForSeat(seatId);
    if (!passenger) return [];
    return requests.filter(r => r.passengerId === passenger.id && r.status === 'pending');
  };

  const getSeatColor = (seat: Seat) => {
    const requests = getRequestsForSeat(seat.id);
    const hasEmergency = requests.some(r => r.type === 'emergency');
    const hasPendingRequests = requests.length > 0;

    if (hasEmergency) return 'bg-red-100 animate-pulse';
    if (hasPendingRequests) return 'bg-yellow-100 animate-pulse';
    if (seat.status === 'occupied') return 'bg-blue-100';
    return 'bg-gray-50';
  };

  const getSeatPosition = (seatId: string) => {
    if (seatId.endsWith('A')) return 'Front';
    if (seatId.endsWith('B')) return 'Middle';
    return 'Rear';
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="grid grid-cols-3 gap-4">
        {seats.map((seat) => {
          const passenger = getPassengerForSeat(seat.id);
          const requests = getRequestsForSeat(seat.id);
          
          return (
            <div
              key={seat.id}
              className={`relative p-4 rounded border-2 transition-all duration-200 
                ${getSeatColor(seat)} 
                ${selectedSeat === seat.id ? 'border-blue-500' : 'border-gray-200'}
                hover:shadow-lg cursor-pointer`}
              onClick={() => onSeatClick(seat.id)}
              onMouseEnter={() => setHoveredSeat(seat.id)}
              onMouseLeave={() => setHoveredSeat(null)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">Seat {seat.id}</div>
                  <div className="text-sm text-gray-500">{getSeatPosition(seat.id)}</div>
                </div>
                {requests.length > 0 && (
                  <span className={`px-2 py-1 rounded-full text-xs 
                    ${requests.some(r => r.type === 'emergency') ? 
                      'bg-red-500 text-white animate-pulse' : 
                      'bg-yellow-500 text-white'}`}
                  >
                    {requests.length}
                  </span>
                )}
              </div>
              
              {passenger && (
                <div className="mt-2 border-t pt-2">
                  <div className="font-medium text-sm">{passenger.name}</div>
                  <div className="text-xs text-gray-600">
                    <div>Temp: {passenger.preferences.temperature}°C</div>
                    {passenger.preferences.dietary.length > 0 && (
                      <div className="truncate">
                        Dietary: {passenger.preferences.dietary.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Hover Details */}
              {hoveredSeat === seat.id && requests.length > 0 && (
                <div className="absolute z-10 w-64 p-4 bg-white rounded-lg shadow-xl 
                  -translate-y-full -translate-x-1/2 left-1/2 mt-2">
                  <h4 className="font-medium">Pending Requests</h4>
                  <ul className="mt-2 space-y-1">
                    {requests.map((request, index) => (
                      <li 
                        key={index}
                        className={`text-sm ${request.type === 'emergency' ? 
                          'text-red-600 font-bold animate-pulse' : ''}`}
                      >
                        {request.type === 'emergency' ? '🚨 EMERGENCY' : request.type}
                        <div className="text-xs text-gray-500">{request.details}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 flex gap-4 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-50 rounded mr-2" />
          <span>Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-100 rounded mr-2" />
          <span>Occupied</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-100 animate-pulse rounded mr-2" />
          <span>Has Requests</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-100 animate-pulse rounded mr-2" />
          <span>Emergency</span>
        </div>
      </div>
    </div>
  );
};

export default CabinLayout;