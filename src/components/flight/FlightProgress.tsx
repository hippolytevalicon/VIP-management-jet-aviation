import React from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-navy-700 rounded-lg shadow-md p-6 transition-colors duration-200">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        {t('flight.progress.title')}
      </h3>

      <div className="mb-6">
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
          <div 
            className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {t('flight.progress.departure')}
          </div>
          <div className="text-lg font-semibold text-gray-800 dark:text-white">
            {origin}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {departureTime}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {t('flight.progress.arrival')}
          </div>
          <div className="text-lg font-semibold text-gray-800 dark:text-white">
            {destination}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {arrivalTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightProgress;