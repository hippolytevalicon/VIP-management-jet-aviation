/*
  seat management component - handles everything about passenger seats in the plane
  
  basically does:
  - shows all the seats we have and if someone's sitting there
  - lets staff add new passengers (there's a modal for that)
  - shows basic info about passengers in their seats (name, what food they want, etc)
  - has that reset button in case we need to clear everything
  
  note: the add passenger form has a bunch of fields - make sure to get their 
  temperature preference right (18-30) and food preferences. the seat dropdown 
  only shows available seats which is pretty handy
  
  works with the VIP context for all the data stuff - check VIPDataContext 
  if you need to change how data is handled
  
  might want to add more features later like moving passengers between seats
*/


import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useVIPData } from '../../context/VIPDataContext';
import { Passenger, PassengerPreferences } from '../../types';
import ResetManager from './ResetManager';

const SeatManagement: React.FC = () => {
  const { seats, passengers, addPassengerWithSeat } = useVIPData();
  const { t } = useTranslation();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState('');
  const [newPassenger, setNewPassenger] = useState<Partial<Passenger>>({
    name: '',
    preferences: {
      dietary: [],
      temperature: 22,
      otherRequirements: []
    }
  });

  const handleAddPassenger = () => {
    if (newPassenger.name && selectedSeat) {
      try {
        const passenger: Passenger = {
          id: `P${Date.now()}`,
          name: newPassenger.name,
          currentSeat: selectedSeat,
          preferences: newPassenger.preferences as PassengerPreferences
        };

        addPassengerWithSeat(passenger, selectedSeat);

        setShowAddModal(false);
        setSelectedSeat('');
        setNewPassenger({
          name: '',
          preferences: {
            dietary: [],
            temperature: 22,
            otherRequirements: []
          }
        });
      } catch (error) {
        console.error('Error adding passenger:', error);
        alert(t('seatManagement.errors.addingPassenger'));
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {t('seatManagement.title')}
        </h1>
        <div className="flex gap-4">
          <ResetManager />
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-600 dark:bg-green-500 text-white px-4 py-2 rounded-md 
                       hover:bg-green-700 dark:hover:bg-green-600 
                       transition-colors duration-200"
          >
            {t('seatManagement.addPassenger')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {seats.map(seat => {
          const assignedPassenger = passengers.find(p => p.id === seat.assignedPassengerId);
          return (
            <div
              key={seat.id}
              className="bg-white dark:bg-navy-700 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-lg font-semibold text-gray-800 dark:text-white">
                  {t('seatManagement.seat')} {seat.id}
                </span>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  seat.status === 'occupied' 
                    ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-100' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}>
                  {t(`seatManagement.status.${seat.status}`)}
                </span>
              </div>
              {assignedPassenger ? (
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{assignedPassenger.name}</p>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    <p>{t('seatManagement.passengerInfo.temperature', { 
                      temp: assignedPassenger.preferences.temperature 
                    })}</p>
                    <p>{t('seatManagement.passengerInfo.dietary', { 
                      preferences: assignedPassenger.preferences.dietary.join(', ') || t('seatManagement.status.unassigned')
                    })}</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">{t('seatManagement.status.unassigned')}</p>
              )}
            </div>
          );
        })}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center">
          <div className="bg-white dark:bg-navy-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              {t('seatManagement.modal.title')}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  {t('seatManagement.modal.selectSeat')}
                </label>
                <select
                  value={selectedSeat}
                  onChange={(e) => setSelectedSeat(e.target.value)}
                  className="w-full px-3 py-2 border dark:border-navy-600 rounded-md
                           bg-white dark:bg-navy-700 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  required
                >
                  <option value="">{t('seatManagement.modal.chooseSeat')}</option>
                  {seats
                    .filter(seat => seat.status !== 'occupied')
                    .map(seat => (
                      <option key={seat.id} value={seat.id}
                              className="bg-white dark:bg-navy-700">
                        {t('seatManagement.seat')} {seat.id}
                      </option>
                    ))
                  }
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  {t('seatManagement.modal.passengerName')}
                </label>
                <input
                  type="text"
                  value={newPassenger.name}
                  onChange={(e) => setNewPassenger({
                    ...newPassenger,
                    name: e.target.value
                  })}
                  className="w-full px-3 py-2 border dark:border-navy-600 rounded-md
                           bg-white dark:bg-navy-700 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  {t('seatManagement.modal.dietaryPreferences')}
                </label>
                <input
                  type="text"
                  value={newPassenger.preferences?.dietary.join(', ')}
                  onChange={(e) => setNewPassenger({
                    ...newPassenger,
                    preferences: {
                      ...newPassenger.preferences as PassengerPreferences,
                      dietary: e.target.value.split(',').map(item => item.trim())
                    }
                  })}
                  className="w-full px-3 py-2 border dark:border-navy-600 rounded-md
                           bg-white dark:bg-navy-700 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  placeholder={t('seatManagement.modal.dietaryPlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  {t('seatManagement.modal.temperaturePreference')}
                </label>
                <input
                  type="number"
                  value={newPassenger.preferences?.temperature}
                  onChange={(e) => setNewPassenger({
                    ...newPassenger,
                    preferences: {
                      ...newPassenger.preferences as PassengerPreferences,
                      temperature: Number(e.target.value)
                    }
                  })}
                  className="w-full px-3 py-2 border dark:border-navy-600 rounded-md
                           bg-white dark:bg-navy-700 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  min="18"
                  max="30"
                />
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 
                           hover:text-gray-800 dark:hover:text-white
                           transition-colors duration-200"
                >
                  {t('seatManagement.modal.cancel')}
                </button>
                <button
                  onClick={handleAddPassenger}
                  disabled={!selectedSeat || !newPassenger.name}
                  className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md 
                           hover:bg-blue-700 dark:hover:bg-blue-600 
                           disabled:bg-gray-300 dark:disabled:bg-gray-600
                           transition-colors duration-200"
                >
                  {t('seatManagement.modal.add')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatManagement;