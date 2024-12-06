//The flight info is a template waiting for actual flight info from the API/plane sensors

import React, { useState, useEffect } from 'react';
import FlightMetrics from './FlightMetrics';
import FlightNotifications from './FlightNotifications';
import FlightProgress from './FlightProgress';

//simulated flight data type
interface FlightData {
  altitude: number;
  speed: number;
  remainingTime: number;
  departureTime: string;
  arrivalTime: string;
  origin: string;
  destination: string;
  progress: number;
}

const FlightInfo: React.FC = () => {
  //simulated flight data
  const [flightData, setFlightData] = useState<FlightData>({
    altitude: 38000,
    speed: 850,
    remainingTime: 180, // 3 hours in minutes
    departureTime: '10:00',
    arrivalTime: '13:00',
    origin: 'JFK',
    destination: 'LAX',
    progress: 25
  });

  //simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setFlightData(prev => ({
        ...prev,
        remainingTime: Math.max(0, prev.remainingTime - 1),
        progress: Math.min(100, prev.progress + 0.1),
        altitude: prev.altitude + (Math.random() - 0.5) * 100,
        speed: prev.speed + (Math.random() - 0.5) * 10
      }));
    }, 5000); //update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Flight Information</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/*left column is flight metrics and progress */}
        <div className="space-y-6">
          <FlightMetrics 
            altitude={Math.round(flightData.altitude)}
            speed={Math.round(flightData.speed)}
            remainingTime={flightData.remainingTime}
          />
          <FlightProgress 
            origin={flightData.origin}
            destination={flightData.destination}
            progress={flightData.progress}
            departureTime={flightData.departureTime}
            arrivalTime={flightData.arrivalTime}
          />
        </div>

        {/*right column is notifications */}
        <FlightNotifications />
      </div>
    </div>
  );
};

export default FlightInfo;