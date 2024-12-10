import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useVIPData } from '../../context/VIPDataContext';
import PassengerCard from './PassengerCard';

const PassengerList: React.FC = () => {
  const { t } = useTranslation();
  const { passengers } = useVIPData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPassengers = passengers.filter(passenger =>
    passenger.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search section */}
      <div className="mb-6">
        <input
          type="text"
          placeholder={t('passenger.list.search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border dark:border-navy-500 rounded-lg 
                     shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     bg-white dark:bg-navy-600 text-gray-900 dark:text-white
                     placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      {/* Passengers grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPassengers.map(passenger => (
          <PassengerCard 
            key={passenger.id} 
            passenger={passenger}
          />
        ))}
      </div>

      {/* No results message */}
      {filteredPassengers.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
          {t('passenger.list.noResults')}
        </div>
      )}
    </div>
  );
};

export default PassengerList;