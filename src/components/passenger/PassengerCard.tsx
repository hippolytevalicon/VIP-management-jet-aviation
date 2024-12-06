import React, { useState } from 'react';
import { Passenger, PassengerPreferences } from '../../types';
import { useVIPData } from '../../context/VIPDataContext';

interface PassengerCardProps {
  passenger: Passenger;
}

const PassengerCard: React.FC<PassengerCardProps> = ({ passenger }) => {
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
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      {/*passenger header*/}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{passenger.name}</h3>
          <p className="text-gray-500">Seat {passenger.currentSeat || 'Not assigned'}</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-600 hover:text-blue-800"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {/*preferences section*/}
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Temperature</label>
            <input
              type="number"
              value={editedPreferences.temperature}
              onChange={(e) => setEditedPreferences({
                ...editedPreferences,
                temperature: Number(e.target.value)
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Dietary Preferences</label>
            <input
              type="text"
              value={editedPreferences.dietary.join(', ')}
              onChange={(e) => setEditedPreferences({
                ...editedPreferences,
                dietary: e.target.value.split(',').map(item => item.trim())
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Other Requirements</label>
            <input
              type="text"
              value={editedPreferences.otherRequirements?.join(', ') || ''}
              onChange={(e) => setEditedPreferences({
                ...editedPreferences,
                otherRequirements: e.target.value ? e.target.value.split(',').map(item => item.trim()) : []
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleSave}
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-gray-700">Temperature Preference</h4>
            <p className="text-gray-900">{passenger.preferences.temperature}°C</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700">Dietary Preferences</h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {passenger.preferences.dietary.map((pref, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {pref}
                </span>
              ))}
            </div>
          </div>
          {passenger.preferences.otherRequirements && passenger.preferences.otherRequirements.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700">Other Requirements</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {passenger.preferences.otherRequirements.map((req, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
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