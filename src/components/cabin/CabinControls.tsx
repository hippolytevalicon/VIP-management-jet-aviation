/*
 cabin control panel - shows a visual view of the cabin and lets staff control temperature/lighting
 
 has two main parts:
 - left side: control panels for each zone (front/mid) with sliders
 - right side: cabin map showing:
   * seats as dots
   * temperature colors (blue = cold, red = hot)
   * lighting effects based on brightness
   * hover info for each seat with passenger details
 
*/

import React, { useState } from 'react';
import { useVIPData } from '../../context/VIPDataContext';
import CabinZoneCard from './CabinZoneCard';
import { CabinZone } from '../../types';

const CabinControls: React.FC = () => {
  const { cabinZones, seats, passengers, requests } = useVIPData();
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
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

  const handleSeatClick = (seatId: string) => {
    setSelectedSeat(seatId === selectedSeat ? null : seatId);
  };

  const getSeatColor = (seatId: string) => {
    const requests = getRequestsForSeat(seatId);
    const hasEmergency = requests.some(r => r.type === 'emergency');
    const hasPendingRequests = requests.length > 0;

    if (hasEmergency) return 'bg-red-500 animate-pulse';
    if (hasPendingRequests) return 'bg-yellow-500 animate-pulse';
    const seat = seats.find(s => s.id === seatId);
    return seat?.status === 'occupied' ? 'bg-blue-500' : 'bg-gray-400';
  };

  const getTemperatureColor = (temp: number) => {
    const normalizedTemp = (temp - 18) / (30 - 18);
    const hue = ((1 - normalizedTemp) * 240).toFixed(0);
    return `hsl(${hue}, 70%, 50%)`;
  };

  const getLightingStyle = (zone: CabinZone) => {
    const brightness = zone.brightness / 100;
    return `brightness(${brightness})`;
  };

  const getSeatsForRow = (rowNum: number) => {
    return {
      seatA: seats.find(s => s.id === `${rowNum}A`),
      seatB: seats.find(s => s.id === `${rowNum}B`)
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Cabin Environment Control</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/*left side - zone controls*/}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Zone Controls</h3>
          <div className="grid gap-4">
            {cabinZones.map((zone) => (
              <CabinZoneCard key={zone.id} zone={zone} />
            ))}
          </div>
        </div>

        {/*right side - cabin overview */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Cabin Overview</h3>
          <div className="relative bg-white rounded-lg shadow-md p-6">
            <svg viewBox="0 0 300 200" className="w-full">
              {/* "aircraft" */}
              <path
                d="M20,75 L60,45 L240,45 L280,75 L240,105 L60,105 L20,75"
                fill="none"
                stroke="#666"
                strokeWidth="2"
              />
              
              {/* 2 zones */}
              {cabinZones.map((zone, index) => (
                <rect
                  key={zone.id}
                  x={60 + (index * 90)}
                  y="45"
                  width="90"
                  height="60"
                  fill={getTemperatureColor(zone.temperature)}
                  style={{
                    filter: getLightingStyle(zone)
                  }}
                />
              ))}

              {/* 1 dot = 1 seat */}
              {[1, 2, 3].map((rowNum) => {
                const { seatA, seatB } = getSeatsForRow(rowNum);
                const baseX = 80 + (rowNum - 1) * 70;
                
                return (
                  <g key={rowNum}>
                    {/* A seats*/}
                    {seatA && (
                      <g>
                        <circle
                          cx={baseX}
                          cy={60}
                          r="8"
                          className={`${getSeatColor(seatA.id)} cursor-pointer transition-colors`}
                          onClick={() => handleSeatClick(seatA.id)}
                          onMouseEnter={() => setHoveredSeat(seatA.id)}
                          onMouseLeave={() => setHoveredSeat(null)}
                        />
                        {hoveredSeat === seatA.id && (
                          <foreignObject
                            x={baseX - 70}
                            y={15}
                            width="140"
                            height="140"
                            className="pointer-events-none"
                          >
                            <div className="bg-white p-2 rounded-lg shadow-lg border text-sm">
                              <div className="font-medium">Seat {seatA.id}</div>
                              {getPassengerForSeat(seatA.id) ? (
                                <>
                                  <div>{getPassengerForSeat(seatA.id)?.name}</div>
                                  {getRequestsForSeat(seatA.id).length > 0 && (
                                    <div className="text-yellow-600">
                                      {getRequestsForSeat(seatA.id).length} active request(s)
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="text-gray-500">Unoccupied</div>
                              )}
                            </div>
                          </foreignObject>
                        )}
                      </g>
                    )}
                    
                    {/*B seats*/}
                    {seatB && (
                      <g>
                        <circle
                          cx={baseX}
                          cy={90}
                          r="8"
                          className={`${getSeatColor(seatB.id)} cursor-pointer transition-colors`}
                          onClick={() => handleSeatClick(seatB.id)}
                          onMouseEnter={() => setHoveredSeat(seatB.id)}
                          onMouseLeave={() => setHoveredSeat(null)}
                        />
                        {hoveredSeat === seatB.id && (
                          <foreignObject
                            x={baseX - 70}
                            y={100}
                            width="140"
                            height="140"
                            className="pointer-events-none"
                          >
                            <div className="bg-white p-2 rounded-lg shadow-lg border text-sm">
                              <div className="font-medium">Seat {seatB.id}</div>
                              {getPassengerForSeat(seatB.id) ? (
                                <>
                                  <div>{getPassengerForSeat(seatB.id)?.name}</div>
                                  {getRequestsForSeat(seatB.id).length > 0 && (
                                    <div className="text-yellow-600">
                                      {getRequestsForSeat(seatB.id).length} active request(s)
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="text-gray-500">Unoccupied</div>
                              )}
                            </div>
                          </foreignObject>
                        )}
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabinControls;