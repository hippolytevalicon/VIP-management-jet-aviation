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
import { useVIPData } from '../../context/VIPDataContext';
import { Passenger, PassengerPreferences } from '../../types';
import ResetManager from './ResetManager';

const SeatManagement: React.FC = () => {
    const { seats, passengers, addPassengerWithSeat } = useVIPData();
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
            //create the passenger object
            const passenger: Passenger = {
              id: `P${Date.now()}`,
              name: newPassenger.name,
              currentSeat: selectedSeat,
              preferences: newPassenger.preferences as PassengerPreferences
            };
    
            //add passenger and assign seat in one operation
            addPassengerWithSeat(passenger, selectedSeat);
    
            //reset form
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
            alert('Error adding passenger. Please try again.');
          }
        }
      };

  return (
    <div className="space-y-6">
      {/*header action*/}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Seat Management</h1>
        <div className="flex gap-4">
          <ResetManager />
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Add Passenger
          </button>
        </div>
      </div>

      {/*seat Grid*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {seats.map(seat => {
          const assignedPassenger = passengers.find(p => p.id === seat.assignedPassengerId);
          return (
            <div
              key={seat.id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-lg font-semibold">Seat {seat.id}</span>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  seat.status === 'occupied' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {seat.status}
                </span>
              </div>
              {assignedPassenger ? (
                <div>
                  <p className="font-medium">{assignedPassenger.name}</p>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Temperature: {assignedPassenger.preferences.temperature}°C</p>
                    <p>Dietary: {assignedPassenger.preferences.dietary.join(', ') || 'None'}</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Unassigned</p>
              )}
            </div>
          );
        })}
      </div>

      {/*add passenger modal*/}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Passenger</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Seat
                </label>
                <select
                  value={selectedSeat}
                  onChange={(e) => setSelectedSeat(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="">Choose a seat</option>
                  {seats
                    .filter(seat => seat.status !== 'occupied')
                    .map(seat => (
                      <option key={seat.id} value={seat.id}>
                        Seat {seat.id}
                      </option>
                    ))
                  }
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Passenger Name
                </label>
                <input
                  type="text"
                  value={newPassenger.name}
                  onChange={(e) => setNewPassenger({
                    ...newPassenger,
                    name: e.target.value
                  })}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dietary Preferences
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
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="e.g., Vegetarian, No nuts"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Temperature Preference
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
                  className="w-full px-3 py-2 border rounded-md"
                  min="18"
                  max="30"
                />
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPassenger}
                  disabled={!selectedSeat || !newPassenger.name}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300"
                >
                  Add Passenger
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