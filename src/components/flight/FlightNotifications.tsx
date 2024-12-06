import React, { useState } from 'react';

const FlightNotifications: React.FC = () => {
  const [notifications] = useState([
    {
      id: 1,
      type: 'info',
      message: 'Entering cruise altitude',
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      type: 'warning',
      message: 'Light turbulence expected in 15 minutes',
      timestamp: new Date().toISOString()
    }
  ]);

  const getNotificationStyle = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-400 text-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-400 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-400 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Flight Notifications</h3>
      <div className="space-y-3">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`p-4 border-l-4 rounded ${getNotificationStyle(notification.type)}`}
          >
            <div className="flex justify-between">
              <p>{notification.message}</p>
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