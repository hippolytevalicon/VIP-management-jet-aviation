import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useVIPData } from '../../context/VIPDataContext';
import CabinZoneCard from './CabinZoneCard';
import { CabinZone, Seat } from '../../types';

const CabinControls: React.FC = () => {
  const { t } = useTranslation();
  const { cabinZones, seats, passengers, requests } = useVIPData();
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

    if (hasEmergency) return 'fill-red-500 dark:fill-red-600';
    if (hasPendingRequests) return 'fill-yellow-500 dark:fill-yellow-600';
    if (seat.status === 'occupied') return 'fill-blue-500 dark:fill-blue-600';
    return 'fill-gray-300 dark:fill-gray-600';
  };

  const getZoneColor = (zone: CabinZone) => {
    const normalizedTemp = (zone.temperature - 18) / (30 - 18);
    const hue = ((1 - normalizedTemp) * 240).toFixed(0);
    const saturation = 70;
    const baseLightness = normalizedTemp > 0.5 ? 60 : 50;
    const lightness = (zone.brightness / 100) * baseLightness;
    
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const getSeatPosition = (seat: Seat) => {
    const seatNumber = parseInt(seat.id.slice(0, -1));
    const isZoneA = seat.id.endsWith('A');
    const xBase = isZoneA ? 120 : 380;
    const y = 80 + (seatNumber - 1) * 60;
    return { x: xBase, y };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {t('cabin.controls.title')}
        </h2>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left side - Zone Controls */}
        <div className="xl:col-span-4 space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            {t('cabin.controls.zoneControls')}
          </h3>
          <div className="grid gap-4">
            {cabinZones.map((zone) => (
              <CabinZoneCard key={zone.id} zone={zone} />
            ))}
          </div>
        </div>

        {/* Right side - Cabin Overview */}
        <div className="xl:col-span-8">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
            {t('cabin.controls.overview')}
          </h3>
          <div className="relative bg-white dark:bg-navy-700 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="aspect-[2/1] relative mb-6">
                <svg className="w-full h-full" viewBox="0 0 600 300">
                  {/* Zone A Rectangle */}
                  <rect
                    x="50" y="50"
                    width="200" height="200"
                    fill={getZoneColor(cabinZones[0])}
                    className="stroke-gray-300 dark:stroke-gray-600 transition-colors duration-300"
                    strokeWidth="2"
                  />
                  
                  {/* Zone B Rectangle */}
                  <rect
                    x="250" y="50"
                    width="300" height="200"
                    fill={getZoneColor(cabinZones[1])}
                    className="stroke-gray-300 dark:stroke-gray-600 transition-colors duration-300"
                    strokeWidth="2"
                  />

                  {/* Zone Labels */}
                  <text x="150" y="35" textAnchor="middle" className="fill-gray-600 dark:fill-gray-400 text-sm font-medium">
                    Zone A (Front)
                  </text>
                  <text x="400" y="35" textAnchor="middle" className="fill-gray-600 dark:fill-gray-400 text-sm font-medium">
                    Zone B (Middle)
                  </text>

                  {/* Seats Layer */}
                  <g>
                    {seats.map((seat) => {
                      const pos = getSeatPosition(seat);
                      return (
                        <g
                          key={seat.id}
                          transform={`translate(${pos.x},${pos.y})`}
                          onMouseEnter={() => setHoveredSeat(seat.id)}
                          onMouseLeave={() => setHoveredSeat(null)}
                        >
                          {/* Seat base */}
                          <rect
                            x="-20" y="-15"
                            width="40" height="30"
                            className={`${getSeatColor(seat)} stroke-gray-400 dark:stroke-gray-500`}
                            strokeWidth="1.5"
                            rx="4"
                          />
                          
                          {/* Seat back */}
                          <rect
                            x="-15" y="-25"
                            width="30" height="10"
                            className={`${getSeatColor(seat)} stroke-gray-400 dark:stroke-gray-500`}
                            strokeWidth="1.5"
                            rx="2"
                          />

                          {/* Seat number */}
                          <text
                            y="5"
                            textAnchor="middle"
                            className="fill-white dark:fill-gray-200 text-xs font-bold"
                          >
                            {seat.id}
                          </text>
                        </g>
                      );
                    })}
                  </g>

                  {/* Tooltips Layer */}
                  {hoveredSeat && seats.map(seat => {
                    if (seat.id === hoveredSeat) {
                      const pos = getSeatPosition(seat);
                      const passenger = getPassengerForSeat(seat.id);
                      const requests = getRequestsForSeat(seat.id);
                      
                      return (
                        <foreignObject
                          key={`tooltip-${seat.id}`}
                          x={pos.x - 75}
                          y={pos.y - 80}
                          width="150"
                          height="60"
                          className="pointer-events-none"
                        >
                          <div className="bg-white dark:bg-navy-800 p-2 rounded-lg shadow-lg 
                                        border border-gray-200 dark:border-gray-700">
                            <div className="text-center">
                              <div className="font-medium text-gray-900 dark:text-white">
                                {passenger?.name || t('cabin.controls.seat.unoccupied')}
                              </div>
                              {requests.length > 0 && (
                                <div className="text-sm text-yellow-600 dark:text-yellow-500">
                                  {t('cabin.controls.seat.activeRequests', { count: requests.length })}
                                </div>
                              )}
                            </div>
                          </div>
                        </foreignObject>
                      );
                    }
                    return null;
                  })}
                </svg>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  { color: 'bg-gray-300 dark:bg-gray-600', label: 'available' },
                  { color: 'bg-blue-500 dark:bg-blue-600', label: 'occupied' },
                  { color: 'bg-yellow-500 dark:bg-yellow-600', label: 'hasRequests', animate: true },
                  { color: 'bg-red-500 dark:bg-red-600', label: 'emergency', animate: true }
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded ${item.color} ${item.animate ? 'animate-pulse' : ''}`} />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {t(`cabin.layout.labels.${item.label}`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabinControls;