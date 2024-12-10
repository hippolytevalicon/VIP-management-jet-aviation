import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useVIPData } from '../../context/VIPDataContext';
import { Seat } from '../../types';

const ResetManager: React.FC = () => {
  const { resetAllData } = useVIPData();
  const [isResetting, setIsResetting] = useState(false);
  const { t } = useTranslation();

  const handleReset = async () => {
    if (window.confirm(t('reset.confirmation'))) {
      setIsResetting(true);
      try {
        //clear localStorage first
        localStorage.removeItem('vip-passengers');
        localStorage.removeItem('vip-requests');
        localStorage.removeItem('vip-seats');
        
        //call the context reset function
        await resetAllData();
        
        //double-check and force clear any remaining assignments
        const remainingPassengers = JSON.parse(localStorage.getItem('vip-passengers') || '[]');
        const remainingSeats = JSON.parse(localStorage.getItem('vip-seats') || '[]') as Seat[];
        
        if (remainingPassengers.length > 0 || remainingSeats.some((s: Seat) => s.assignedPassengerId)) {
          localStorage.setItem('vip-passengers', '[]');
          localStorage.setItem('vip-seats', JSON.stringify(
            remainingSeats.map((seat: Seat) => ({
              ...seat,
              status: 'available' as const,
              assignedPassengerId: undefined
            }))
          ));
        }
      } catch (error) {
        console.error('Reset error:', error);
        alert(t('reset.error'));
      } finally {
        setIsResetting(false);
      }
    }
  };

  return (
    <button
      onClick={handleReset}
      disabled={isResetting}
      className="bg-red-600 dark:bg-red-500 text-white px-4 py-2 rounded-md 
                 hover:bg-red-700 dark:hover:bg-red-600 
                 disabled:bg-gray-300 dark:disabled:bg-gray-600
                 transition-colors duration-200"
    >
      {isResetting ? t('reset.button.resetting') : t('reset.button.default')}
    </button>
  );
};

export default ResetManager;