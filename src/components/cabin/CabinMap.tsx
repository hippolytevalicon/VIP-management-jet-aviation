/*
 visual svg map of the cabin - shows each seat as a rectangle when hover
*/

import React from 'react';
import { useVIPData } from '../../context/VIPDataContext';
import { Seat } from '../../types';

interface CabinMapProps {
  onSeatClick: (seatId: string) => void;
  hoveredSeat: string | null;
}

const CabinMap: React.FC<CabinMapProps> = ({ onSeatClick, hoveredSeat }) => {
  const { seats, passengers, requests } = useVIPData();

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

    if (hasEmergency) return 'red';
    if (hasPendingRequests) return 'yellow';
    if (seat.status === 'occupied') return 'blue';
    return 'lightgray';
  };

  const getSeatClass = (seat: Seat) => {
    const requests = getRequestsForSeat(seat.id);
    const hasEmergency = requests.some(r => r.type === 'emergency');
    const hasPendingRequests = requests.length > 0;

    if (hasEmergency) return 'animate-pulse';
    if (hasPendingRequests) return 'animate-pulse';
    return '';
  };

  return (
    <svg viewBox="0 0 300 150" className="w-full h-full" style={{ minHeight: '200px' }}>
      {/* aircraft*/}
      <path
        d="M20,75 L60,45 L240,45 L280,75 L240,105 L60,105 L20,75"
        fill="none"
        stroke="#666"
        strokeWidth="2"
      />

      {/* seat visualizations */}
      {seats.map(seat => {
        const seatNumber = parseInt(seat.id.slice(0, -1));
        const seatLetter = seat.id.slice(-1);
        const x = 60 + (seatNumber - 1) * 60;
        const y = seatLetter === 'A' ? 55 : 85;

        return (
          <g 
            key={seat.id}
            className={`cursor-pointer ${getSeatClass(seat)}`}
            onClick={() => onSeatClick(seat.id)}
          >
            <rect
              x={x}
              y={y}
              width="40"
              height="20"
              fill={getSeatColor(seat)}
              stroke="#666"
              strokeWidth="1"
            />
            <text
              x={x + 20}
              y={y + 14}
              textAnchor="middle"
              className="text-xs font-semibold"
              fill="white"
            >
              {seat.id}
            </text>

            {/*passenger details when hover*/}
            {hoveredSeat === seat.id && (
              <g>
                <rect
                  x={x - 80}
                  y={y - 60}
                  width="200"
                  height="50"
                  fill="white"
                  stroke="#666"
                  strokeWidth="1"
                  rx="4"
                  ry="4"
                />
                <text x={x} y={y - 40} className="text-xs">
                  {getPassengerForSeat(seat.id)?.name || 'Unassigned'}
                </text>
                <text x={x} y={y - 25} className="text-xs">
                  Requests: {getRequestsForSeat(seat.id).length}
                </text>
              </g>
            )}
          </g>
        );
      })}

      {/*legend is unused*/}
      <g transform="translate(20, 120)">
        <rect x="0" y="0" width="12" height="12" fill="lightgray" />
        <text x="16" y="10" className="text-xs">Available</text>

        <rect x="80" y="0" width="12" height="12" fill="blue" />
        <text x="96" y="10" className="text-xs">Occupied</text>

        <rect x="160" y="0" width="12" height="12" fill="yellow" className="animate-pulse" />
        <text x="176" y="10" className="text-xs">Requests</text>

        <rect x="240" y="0" width="12" height="12" fill="red" className="animate-pulse" />
        <text x="256" y="10" className="text-xs">Emergency</text>
      </g>
    </svg>
  );
};

export default CabinMap;