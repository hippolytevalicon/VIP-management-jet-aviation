// Header.tsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useVIPData } from '../../context/VIPDataContext';

const Header: React.FC = () => {
  const { logout, user } = useAuth();
  const { addRequest, passengers, requests, seats } = useVIPData();

  const getCurrentPassenger = () => {
    if (user?.role === 'seat') {
      const seatId = user.username;
      const currentSeat = seats.find(s => s.id === seatId);
      if (currentSeat?.assignedPassengerId) {
        return passengers.find(p => p.id === currentSeat.assignedPassengerId);
      }
    }
    return null;
  };

  const currentPassenger = getCurrentPassenger();

  const getStaffStats = () => {
    const occupiedSeats = seats.filter(s => s.status === 'occupied').length;
    const pendingRequests = requests.filter(r => r.status === 'pending').length;
    return { occupiedSeats, pendingRequests };
  };

  const handleEmergency = () => {
    const currentPassenger = getCurrentPassenger();
    if (currentPassenger) {
      addRequest({
        passengerId: currentPassenger.id,
        type: 'emergency',
        status: 'pending',
        details: 'Emergency assistance needed',
      });
    }
  };

  const staffStats = getStaffStats();

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
            <img 
              src="/logo.png" 
              alt="VIP Aircraft" 
              className="h-6 w-auto"
            />
          <h1 className="text-2xl font-serif font-bold text-gray-900">
            VIP Aircraft Management
          </h1>
          </div>
          
          <div className="flex items-center gap-6">
            {user?.role === 'staff' ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50/80 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-sm text-blue-900 font-medium">
                      {staffStats.occupiedSeats}/{seats.length} Seats Occupied
                    </span>
                  </div>
                  <div className="bg-amber-50/80 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-sm text-amber-900 font-medium">
                      {staffStats.pendingRequests} Pending Requests
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={handleEmergency}
                  className="px-6 py-2 bg-red-600/90 text-white rounded-full 
                           hover:bg-red-700 transition-colors duration-200 
                           focus:outline-none focus:ring-2 focus:ring-red-500 
                           focus:ring-offset-2 animate-pulse shadow-lg"
                >
                  Emergency Assistance
                </button>
                
                <div className="text-sm font-medium">
                  {currentPassenger ? (
                    <div className="flex flex-col items-end">
                      <span className="text-gray-900">{currentPassenger.name}</span>
                      <span className="text-gray-500">Seat {user?.username}</span>
                    </div>
                  ) : (
                    <span className="text-gray-500">No passenger assigned</span>
                  )}
                </div>
              </>
            )}
            
            <button
              onClick={logout}
              className="px-6 py-2 text-sm font-medium border-2 border-gray-800 
                       text-gray-800 rounded-full hover:bg-gray-800 hover:text-white 
                       transition-colors duration-200 focus:outline-none focus:ring-2 
                       focus:ring-gray-800 focus:ring-offset-2"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;