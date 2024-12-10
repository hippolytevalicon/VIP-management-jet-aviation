import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Passenger, PassengerPreferences } from '../../types';
import { useVIPData } from '../../context/VIPDataContext';

interface PassengerCardProps {
  passenger: Passenger;
}

const PassengerCard: React.FC<PassengerCardProps> = ({ passenger }) => {
  const { t } = useTranslation();
  const { updatePassenger } = useVIPData();
  const [isEditing, setIsEditing] = useState(false);
  const [editedPreferences, setEditedPreferences] = useState<PassengerPreferences>(passenger.preferences);

  const handleSave = () => {
    updatePassenger({
      ...passenger,
      preferences: editedPreferences
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-navy-700 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{passenger.name}</h3>
          <p className="text-gray-500 dark:text-gray-400">
            {t('passenger.list.seat')} {passenger.currentSeat || t('passenger.list.notAssigned')}
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          {isEditing ? t('passenger.list.cancel') : t('passenger.list.edit')}
        </button>
      </div>

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
            <input
              type="text"
              value={editedPreferences.otherRequirements?.join(', ') || ''}
              onChange={(e) => setEditedPreferences({
                ...editedPreferences,
                otherRequirements: e.target.value ? e.target.value.split(',').map(item => item.trim()) : []
              })}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-navy-500
                       bg-white dark:bg-navy-600 text-gray-900 dark:text-white
                       shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder={t('passenger.preferences.placeholder.other')}
            />
          </div>

          <button
            onClick={handleSave}
            className="mt-4 w-full bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-md 
                     hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     dark:focus:ring-blue-400 dark:focus:ring-offset-navy-800"
          >
            {t('passenger.preferences.save')}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('passenger.preferences.temperature')}
            </h4>
            <p className="text-gray-900 dark:text-white">{passenger.preferences.temperature}°C</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('passenger.preferences.dietary')}
            </h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {passenger.preferences.dietary.map((pref, index) => (
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
          {passenger.preferences.otherRequirements && passenger.preferences.otherRequirements.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('passenger.preferences.other')}
              </h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {passenger.preferences.otherRequirements.map((req, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                             bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  >
                    {req}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PassengerCard;