import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useVIPData } from '../../context/VIPDataContext';
import { useAuth } from '../../context/AuthContext';
import RequestCard from './RequestCard';
import NewRequestForm from './NewRequestForm';
import { RequestStatus } from '../../types';

const RequestList: React.FC = () => {
  const { t } = useTranslation();
  const { requests, passengers, seats } = useVIPData();
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'all'>('all');

  const getCurrentPassengerId = () => {
    if (user?.role === 'seat') {
      const seat = seats.find(s => s.id === user.username);
      return seat?.assignedPassengerId;
    }
    return null;
  };

  const currentPassengerId = getCurrentPassengerId();

  const filteredRequests = requests.filter(request => {
    const statusMatch = statusFilter === 'all' || request.status === statusFilter;
    if (user?.role === 'staff') {
      return statusMatch;
    }
    return statusMatch && request.passengerId === currentPassengerId;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {t(user?.role === 'staff' ? 'request.list.title.staff' : 'request.list.title.passenger')}
        </h2>
        
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as RequestStatus | 'all')}
            className="px-3 py-2 border dark:border-navy-500 rounded-lg 
                      bg-white dark:bg-navy-600 text-gray-900 dark:text-white
                      shadow-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                      focus:border-blue-500 dark:focus:border-blue-400"
          >
            <option value="all">{t('request.list.filter.all')}</option>
            <option value="pending">{t('request.list.filter.pending')}</option>
            <option value="in-progress">{t('request.list.filter.in-progress')}</option>
            <option value="completed">{t('request.list.filter.completed')}</option>
          </select>
        </div>
      </div>

      {user?.role === 'seat' && currentPassengerId && (
        <div className="mb-6">
          <NewRequestForm passengerId={currentPassengerId} />
        </div>
      )}

      <div className="space-y-4">
        {filteredRequests.map(request => (
          <RequestCard
            key={request.id}
            request={request}
            passenger={passengers.find(p => p.id === request.passengerId)}
            isStaff={user?.role === 'staff'}
          />
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            {statusFilter === 'all' 
              ? t('request.list.noRequests.all')
              : t('request.list.noRequests.filtered', { status: t(`request.list.filter.${statusFilter}`) })}
          </p>
        </div>
      )}
    </div>
  );
};

export default RequestList;