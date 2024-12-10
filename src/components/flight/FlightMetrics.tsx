import React from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const altitudeInMeters = Math.round(altitude * 0.3048);
  const speedInKmh = Math.round(speed * 1.852);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return t('flight.metrics.timeFormat', { hours, minutes: mins });
  };

  return (
    <div className="bg-white dark:bg-navy-700 rounded-lg shadow-md p-6 transition-colors duration-200">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        {t('flight.metrics.title')}
      </h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-gray-50 dark:bg-navy-600 rounded-lg transition-colors duration-200">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {t('flight.metrics.altitude')}
          </div>
          <div className="text-xl font-semibold text-gray-800 dark:text-white">
            {altitudeInMeters.toLocaleString()}{t('flight.metrics.altitudeUnit')}
          </div>
        </div>
        <div className="text-center p-4 bg-gray-50 dark:bg-navy-600 rounded-lg transition-colors duration-200">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {t('flight.metrics.speed')}
          </div>
          <div className="text-xl font-semibold text-gray-800 dark:text-white">
            {speedInKmh}{t('flight.metrics.speedUnit')}
          </div>
        </div>
        <div className="text-center p-4 bg-gray-50 dark:bg-navy-600 rounded-lg transition-colors duration-200">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {t('flight.metrics.timeRemaining')}
          </div>
          <div className="text-xl font-semibold text-gray-800 dark:text-white">
            {formatTime(remainingTime)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightMetrics;