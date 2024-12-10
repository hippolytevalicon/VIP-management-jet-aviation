import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useVIPData } from '../../context/VIPDataContext';
import { Passenger } from '../../types';

const PassengerPreferencesView: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { passengers, seats, updatePassenger } = useVIPData();
  const [isEditing, setIsEditing] = useState(false);

  const getCurrentPassenger = (): Passenger | null => {
    if (!user || user.role !== 'seat') return null;
    const seatId = user.username;
    const seat = seats.find(s => s.id === seatId);
    if (!seat?.assignedPassengerId) return null;
    return passengers.find(p => p.id === seat.assignedPassengerId) || null;
  };

  const currentPassenger = getCurrentPassenger();
  const [editedPreferences, setEditedPreferences] = useState(currentPassenger?.preferences || {
    dietary: [],
    temperature: 22,
    otherRequirements: []
  });

  if (!currentPassenger) {
    return (
      <div className="p-6 bg-white dark:bg-navy-700 rounded-lg shadow-md">
        <p className="text-gray-500 dark:text-gray-400 text-center">
          {t('passenger.preferences.noPassenger')}
        </p>
      </div>
    );
  }

  const handleSave = () => {
    if (currentPassenger) {
      updatePassenger({
        ...currentPassenger,
        preferences: editedPreferences
      });
      setIsEditing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {t('passenger.preferences.title')}
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          {isEditing ? t('passenger.preferences.cancel') : t('passenger.preferences.edit')}
        </button>
      </div>

      <div className="bg-white dark:bg-navy-700 rounded-lg shadow-md p-6">
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                {t('passenger.preferences.temperature')}
              </label>
              <input
                type="number"
                value={editedPreferences.temperature}
                onChange={(e) => setEditedPreferences({
                  ...editedPreferences,
                  temperature: Number(e.target.value)
                })}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-navy-500
                         bg-white dark:bg-navy-600 text-gray-900 dark:text-white
                         shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400"
                min="18"
                max="30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                {t('passenger.preferences.dietary')}
              </label>
              <input
                type="text"
                value={editedPreferences.dietary.join(', ')}
                onChange={(e) => setEditedPreferences({
                  ...editedPreferences,
                  dietary: e.target.value.split(',').map(item => item.trim())
                })}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-navy-500
                         bg-white dark:bg-navy-600 text-gray-900 dark:text-white
                         shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400"
                placeholder={t('passenger.preferences.placeholder.dietary')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                {t('passenger.preferences.other')}
              </label>
              <textarea
                value={editedPreferences.otherRequirements?.join('\n') || ''}
                onChange={(e) => setEditedPreferences({
                  ...editedPreferences,
                  otherRequirements: e.target.value.split('\n').map(item => item.trim()).filter(Boolean)
                })}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-navy-500
                         bg-white dark:bg-navy-600 text-gray-900 dark:text-white
                         shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400"
                rows={3}
                placeholder={t('passenger.preferences.placeholder.other')}
              />
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-md 
                       hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
            >
              {t('passenger.preferences.save')}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('passenger.preferences.temperature')}
              </h3>
              <p className="mt-1 text-gray-900 dark:text-white">
                {currentPassenger.preferences.temperature}°C
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('passenger.preferences.dietary')}
              </h3>
              <div className="mt-1 flex flex-wrap gap-2">
                {currentPassenger.preferences.dietary.map((pref, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                             bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-100"
                  >
                    {pref}
                  </span>
                ))}
              </div>
            </div>

            {currentPassenger.preferences.otherRequirements && 
             currentPassenger.preferences.otherRequirements.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('passenger.preferences.other')}
                </h3>
                <ul className="mt-1 list-disc list-inside text-gray-900 dark:text-white">
                  {currentPassenger.preferences.otherRequirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PassengerPreferencesView;