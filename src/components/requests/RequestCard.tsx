import React from 'react';
import { Request, Passenger, RequestStatus } from '../../types';
import { useVIPData } from '../../context/VIPDataContext';

interface RequestCardProps {
  request: Request;
  passenger?: Passenger;
  isStaff: boolean;
}

const RequestCard: React.FC<RequestCardProps> = ({ request, passenger, isStaff }) => {
  const { updateRequest } = useVIPData();

  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
    }
  };

  const handleStatusChange = (newStatus: RequestStatus) => {
    updateRequest({ ...request, status: newStatus });
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      {/*request header*/}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {isStaff ? (
              <>
                {passenger?.name || 'Unknown Passenger'}
                <span className="text-sm text-gray-500 block">
                  Seat {passenger?.currentSeat || 'Not assigned'}
                </span>
              </>
            ) : (
              <span className="capitalize">{request.type} Request</span>
            )}
          </h3>
        </div>
        <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(request.status)}`}>
          {request.status}
        </span>
      </div>

      {/* Request Details */}
      <div className="space-y-3">
        {isStaff && (
          <div>
            <span className="text-sm font-medium text-gray-700">Type:</span>
            <span className="ml-2 text-gray-900 capitalize">{request.type}</span>
          </div>
        )}
        <div>
          <span className="text-sm font-medium text-gray-700">Details:</span>
          <p className="mt-1 text-gray-900">{request.details}</p>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-700">Time:</span>
          <span className="ml-2 text-gray-900">{formatTimestamp(request.timestamp)}</span>
        </div>
      </div>

      {/* Action Buttons - Only shown for staff */}
      {isStaff && (
        <div className="mt-6 flex gap-2">
          {request.status === 'pending' && (
            <button
              onClick={() => handleStatusChange('in-progress')}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Start Request
            </button>
          )}
          {request.status === 'in-progress' && (
            <button
              onClick={() => handleStatusChange('completed')}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Complete Request
            </button>
          )}
          {request.status === 'completed' && (
            <button
              disabled
              className="flex-1 bg-gray-100 text-gray-400 px-4 py-2 rounded-md cursor-not-allowed"
            >
              Completed
            </button>
          )}
        </div>
      )}

      {/* Status Timeline - Shown for passengers */}
      {!isStaff && (
        <div className="mt-6 border-t pt-4">
          <div className="flex items-center space-x-4">
            <div className={`h-2 w-2 rounded-full ${
              request.status === 'pending' ? 'bg-yellow-500' : 'bg-green-500'
            }`} />
            <span className="text-sm">Submitted</span>
            
            <div className={`h-2 w-2 rounded-full ${
              request.status === 'in-progress' ? 'bg-blue-500' : 
              request.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
            }`} />
            <span className="text-sm">In Progress</span>
            
            <div className={`h-2 w-2 rounded-full ${
              request.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
            }`} />
            <span className="text-sm">Completed</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestCard;