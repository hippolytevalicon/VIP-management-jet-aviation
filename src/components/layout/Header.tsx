//header, different whether you're a VIP or a staff member
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useVIPData } from '../../context/VIPDataContext';
import LanguageSelector from '../common/LanguageSelector';
import ThemeToggle from '../common/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';

const Header: React.FC = () => {
  const { logout, user } = useAuth();
  const { addRequest, passengers, requests, seats } = useVIPData();
  const { t } = useTranslation();

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

  const { isDarkMode } = useTheme(); //needed to change the logo

  return (
    <header className="bg-white/80 dark:bg-navy-800/80 backdrop-blur-sm 
                  border-b border-gray-200 dark:border-navy-600 
                  transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
          <img 
  src={isDarkMode ? "/dark-logo.png" : "/logo.png"} 
  alt="VIP Aircraft" 
  className="h-6 w-auto transition-opacity duration-300"
/>
            <h1 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">
              {t('header.title')}
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            {user?.role === 'staff' ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4">
  <div className="bg-blue-50/80 dark:bg-navy-600/80 backdrop-blur-sm px-4 py-2 rounded-full">
    <span className="text-sm text-blue-900 dark:text-blue-100 font-medium">
      {t('header.stats.seatsOccupied', {
        occupied: staffStats.occupiedSeats,
        total: seats.length
      })}
    </span>
  </div>
  <div className="bg-amber-50/80 dark:bg-navy-600/80 backdrop-blur-sm px-4 py-2 rounded-full">
    <span className="text-sm text-amber-900 dark:text-amber-100 font-medium">
      {t('header.stats.pendingRequests', {
        count: staffStats.pendingRequests
      })}
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
                  {t('header.emergency')}
                </button>
                
                <div className="text-sm font-medium">
                  {currentPassenger ? (
                    <div className="flex flex-col items-end">
                      <span className="text-gray-900 dark:text-white">{currentPassenger.name}</span>
                      <span className="text-gray-500 dark:text-gray-300">
                        {t('header.passenger.seatLabel', { seat: user?.username })}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-500 dark:text-gray-300">
                      {t('header.passenger.noAssignment')}
                    </span>
                  )}
                </div>
              </>
            )}
            
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <ThemeToggle />
            </div>
            
            <button
              onClick={logout}
              className="px-6 py-2 text-sm font-medium border-2 border-gray-800 dark:border-white
                       text-gray-800 dark:text-white rounded-full hover:bg-gray-800 hover:text-white 
                       dark:hover:bg-white dark:hover:text-navy-800
                       transition-colors duration-200 focus:outline-none focus:ring-2 
                       focus:ring-gray-800 dark:focus:ring-white focus:ring-offset-2"
            >
              {t('header.logout')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;