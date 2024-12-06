import React, { useState } from 'react';
import { useVIPData } from '../../context/VIPDataContext';
import { Seat } from '../../types';

const ResetManager: React.FC = () => {
  const { seats, passengers, resetAllData } = useVIPData();
  const [isResetting, setIsResetting] = useState(false);

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all seat assignments? This action cannot be undone.')) {
      setIsResetting(true);
      try {
        // Clear localStorage first
        localStorage.removeItem('vip-passengers');
        localStorage.removeItem('vip-requests');
        localStorage.removeItem('vip-seats');
        
        // Call the context reset function
        await resetAllData();
        
        // Double-check and force clear any remaining assignments
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
        alert('Error resetting seats. Please try again.');
      } finally {
        setIsResetting(false);
      }
    }
  };

  return (
    <button
      onClick={handleReset}
      disabled={isResetting}
      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:bg-gray-300"
    >
      {isResetting ? 'Resetting...' : 'Reset All Seats'}
    </button>
  );
};

export default ResetManager;