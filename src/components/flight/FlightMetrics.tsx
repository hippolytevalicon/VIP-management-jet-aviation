import React from 'react';

interface FlightMetricsProps {
  altitude: number;
  speed: number;
  remainingTime: number;
}

const FlightMetrics: React.FC<FlightMetricsProps> = ({ 
  altitude, 
  speed, 
  remainingTime 
}) => {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Flight Metrics</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-500">Altitude</div>
          <div className="text-xl font-semibold text-gray-800">{altitude.toLocaleString()}ft</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-500">Speed</div>
          <div className="text-xl font-semibold text-gray-800">{speed}kts</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-500">Time Remaining</div>
          <div className="text-xl font-semibold text-gray-800">{formatTime(remainingTime)}</div>
        </div>
      </div>
    </div>
  );
};

export default FlightMetrics;