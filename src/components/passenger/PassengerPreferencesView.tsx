import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useVIPData } from '../../context/VIPDataContext';
import { Passenger } from '../../types';

const PassengerPreferencesView: React.FC = () => {
  const { user } = useAuth();
  const { passengers, seats, updatePassenger } = useVIPData();
  const [isEditing, setIsEditing] = useState(false);

  //get current passenger based on seat
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
      <div className="p-6 bg-white rounded-lg shadow-md">
        <p className="text-gray-500 text-center">No passenger assigned to this seat.</p>
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
        <h2 className="text-2xl font-bold text-gray-800">Your Preferences</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-600 hover:text-blue-800"
        >
          {isEditing ? 'Cancel' : 'Edit Preferences'}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Temperature Preference</label>
              <input
                type="number"
                value={editedPreferences.temperature}
                onChange={(e) => setEditedPreferences({
                  ...editedPreferences,
                  temperature: Number(e.target.value)
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="18"
                max="30"
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
                placeholder="e.g., Vegetarian, No nuts"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Other Requirements</label>
              <textarea
                value={editedPreferences.otherRequirements?.join('\n') || ''}
                onChange={(e) => setEditedPreferences({
                  ...editedPreferences,
                  otherRequirements: e.target.value.split('\n').map(item => item.trim()).filter(Boolean)
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                placeholder="Enter each requirement on a new line"
              />
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700">Temperature Preference</h3>
              <p className="mt-1 text-gray-900">{currentPassenger.preferences.temperature}°C</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700">Dietary Preferences</h3>
              <div className="mt-1 flex flex-wrap gap-2">
                {currentPassenger.preferences.dietary.map((pref, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {pref}
                  </span>
                ))}
              </div>
            </div>

            {currentPassenger.preferences.otherRequirements && 
             currentPassenger.preferences.otherRequirements.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700">Other Requirements</h3>
                <ul className="mt-1 list-disc list-inside text-gray-900">
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