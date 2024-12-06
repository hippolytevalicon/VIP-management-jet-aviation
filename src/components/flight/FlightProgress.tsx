import React from 'react';

interface FlightProgressProps {
  origin: string;
  destination: string;
  progress: number;
  departureTime: string;
  arrivalTime: string;
}

const FlightProgress: React.FC<FlightProgressProps> = ({
  origin,
  destination,
  progress,
  departureTime,
  arrivalTime
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Flight Progress</h3>
      
      {/*progress bar so it looks nicer :)*/}
      <div className="mb-6">
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/*route info*/}
      <div className="flex justify-between items-center">
        <div className="text-center">
          <div className="text-sm text-gray-500">Departure</div>
          <div className="text-lg font-semibold text-gray-800">{origin}</div>
          <div className="text-sm text-gray-600">{departureTime}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500">Arrival</div>
          <div className="text-lg font-semibold text-gray-800">{destination}</div>
          <div className="text-sm text-gray-600">{arrivalTime}</div>
        </div>
      </div>
    </div>
  );
};

export default FlightProgress;