import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FlightNotifications: React.FC = () => {
  const { t } = useTranslation();
  
  const [notifications] = useState([
    {
      id: 1,
      type: 'info',
      messageKey: 'cruiseAltitude',
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      type: 'warning',
      messageKey: 'turbulence',
      timestamp: new Date().toISOString()
    }
  ]);

  const getNotificationStyle = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/50 border-yellow-400 dark:border-yellow-600 text-yellow-800 dark:text-yellow-200';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/50 border-blue-400 dark:border-blue-600 text-blue-800 dark:text-blue-200';
      default:
        return 'bg-gray-50 dark:bg-gray-800 border-gray-400 dark:border-gray-600 text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="bg-white dark:bg-navy-700 rounded-lg shadow-md p-6 transition-colors duration-200">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        {t('flight.notifications.title')}
      </h3>
      <div className="space-y-3">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`p-4 border-l-4 rounded transition-colors duration-200 ${getNotificationStyle(notification.type)}`}
          >
            <div className="flex justify-between">
              <p>{t(`flight.notifications.messages.${notification.messageKey}`)}</p>
              <span className="text-sm opacity-75">
                {new Date(notification.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightNotifications;