import React, { useState } from 'react';
import { useVIPData } from '../../context/VIPDataContext';
import { useAuth } from '../../context/AuthContext';
import RequestCard from './RequestCard';
import NewRequestForm from './NewRequestForm';
import { RequestStatus } from '../../types';

const RequestList: React.FC = () => {
  const { requests, passengers, seats } = useVIPData();
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'all'>('all');

  //get current passenger ID
  const getCurrentPassengerId = () => {
    if (user?.role === 'seat') {
      const seat = seats.find(s => s.id === user.username);
      return seat?.assignedPassengerId;
    }
    return null;
  };

  const currentPassengerId = getCurrentPassengerId();

  //filter requests based on role and status
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
        <h2 className="text-2xl font-bold text-gray-800">
          {user?.role === 'staff' ? 'All Service Requests' : 'Your Requests'}
        </h2>
        
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as RequestStatus | 'all')}
            className="px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/*show NewRequestForm only for filled seats*/}
      {user?.role === 'seat' && currentPassengerId && (
        <div className="mb-6">
          <NewRequestForm passengerId={currentPassengerId} />
        </div>
      )}

      {/*requests list*/}
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

      {/*empty state*/}
      {filteredRequests.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {statusFilter === 'all' 
              ? 'No requests found.' 
              : `No ${statusFilter} requests found.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default RequestList;