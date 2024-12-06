import React, { useState } from 'react';
import { useVIPData } from '../../context/VIPDataContext';
import PassengerCard from './PassengerCard';

const PassengerList: React.FC = () => {
  const { passengers } = useVIPData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPassengers = passengers.filter(passenger =>
    passenger.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/*search and filter sectior*/}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search passengers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/*passengers grid*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPassengers.map(passenger => (
          <PassengerCard 
            key={passenger.id} 
            passenger={passenger}
          />
        ))}
      </div>

      {/*no results*/}
      {filteredPassengers.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No passengers found matching your search.
        </div>
      )}
    </div>
  );
};

export default PassengerList;