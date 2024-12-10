import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FlightMetrics from './FlightMetrics';
import FlightNotifications from './FlightNotifications';
import FlightProgress from './FlightProgress';

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
  const { t } = useTranslation();

  const [flightData, setFlightData] = useState<FlightData>({
    altitude: 38000,
    speed: 450,
    remainingTime: 180,
    departureTime: '10:00',
    arrivalTime: '13:00',
    origin: 'CDG',
    destination: 'FRA',
    progress: 25
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setFlightData(prev => ({
        ...prev,
        remainingTime: Math.max(0, prev.remainingTime - 1),
        progress: Math.min(100, prev.progress + 0.1),
        altitude: prev.altitude + (Math.random() - 0.5) * 100,
        speed: prev.speed + (Math.random() - 0.5) * 5
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-200">
        {t('flight.title')}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        <FlightNotifications />
      </div>
    </div>
  );
};

export default FlightInfo;