import React from 'react';
import { useTranslation } from 'react-i18next';
import { Request, Passenger, RequestStatus } from '../../types';
import { useVIPData } from '../../context/VIPDataContext';

interface RequestCardProps {
  request: Request;
  passenger?: Passenger;
  isStaff: boolean;
}

const RequestCard: React.FC<RequestCardProps> = ({ request, passenger, isStaff }) => {
  const { t } = useTranslation();
  const { updateRequest } = useVIPData();

  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-100';
      case 'in-progress':
        return 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-100';
      case 'completed':
        return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-100';
    }
  };

  const handleStatusChange = (newStatus: RequestStatus) => {
    updateRequest({ ...request, status: newStatus });
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="bg-white dark:bg-navy-700 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {isStaff ? (
              <>
                {passenger?.name || t('request.card.unknownPassenger')}
                <span className="text-sm text-gray-500 dark:text-gray-400 block">
                  {t('request.card.seatLabel', { 
                    seat: passenger?.currentSeat || t('request.card.notAssigned')
                  })}
                </span>
              </>
            ) : (
              <span className="capitalize">{request.type} Request</span>
            )}
          </h3>
        </div>
        <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(request.status)}`}>
          {t(`request.list.filter.${request.status}`)}
        </span>
      </div>

      <div className="space-y-3">
        {isStaff && (
          <div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('request.card.type')}:
            </span>
            <span className="ml-2 text-gray-900 dark:text-white capitalize">{request.type}</span>
          </div>
        )}
        <div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('request.card.details')}:
          </span>
          <p className="mt-1 text-gray-900 dark:text-white">{request.details}</p>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('request.card.time')}:
          </span>
          <span className="ml-2 text-gray-900 dark:text-white">{formatTimestamp(request.timestamp)}</span>
        </div>
      </div>

      {isStaff && (
        <div className="mt-6 flex gap-2">
          {request.status === 'pending' && (
            <button
              onClick={() => handleStatusChange('in-progress')}
              className="flex-1 bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-md 
                       hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
            >
              {t('request.card.buttons.start')}
            </button>
          )}
          {request.status === 'in-progress' && (
            <button
              onClick={() => handleStatusChange('completed')}
              className="flex-1 bg-green-600 dark:bg-green-500 text-white px-4 py-2 rounded-md 
                       hover:bg-green-700 dark:hover:bg-green-600 transition-colors duration-200"
            >
              {t('request.card.buttons.complete')}
            </button>
          )}
          {request.status === 'completed' && (
            <button
              disabled
              className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 
                       px-4 py-2 rounded-md cursor-not-allowed"
            >
              {t('request.card.buttons.completed')}
            </button>
          )}
        </div>
      )}

      {!isStaff && (
        <div className="mt-6 border-t dark:border-navy-600 pt-4">
          <div className="flex items-center space-x-4">
            <div className={`h-2 w-2 rounded-full ${
              request.status === 'pending' ? 'bg-yellow-500' : 'bg-green-500'
            }`} />
            <span className="text-sm dark:text-gray-300">{t('request.card.timeline.submitted')}</span>
            
            <div className={`h-2 w-2 rounded-full ${
              request.status === 'in-progress' ? 'bg-blue-500' : 
              request.status === 'completed' ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
            }`} />
            <span className="text-sm dark:text-gray-300">{t('request.card.timeline.inProgress')}</span>
            
            <div className={`h-2 w-2 rounded-full ${
              request.status === 'completed' ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
            }`} />
            <span className="text-sm dark:text-gray-300">{t('request.card.timeline.completed')}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestCard;