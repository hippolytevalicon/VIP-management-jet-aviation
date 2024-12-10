import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';

const NoPassengerAssigned: React.FC = () => {
  const { logout, user } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {t('header.title')}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              {t('header.passenger.seatLabel', { seat: user?.username })}
            </span>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md 
                       hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                       focus:ring-red-500"
            >
              {t('header.logout')}
            </button>
          </div>
        </div>
      </header>

      {/* error message */}
      <div className="flex items-center justify-center mt-20">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {t('layout.errors.noPassenger.title')}
            </h2>
            <p className="text-gray-600 mb-6">
              {t('layout.errors.noPassenger.message')}
            </p>
            <button
              onClick={logout}
              className="w-full bg-red-600 text-white px-4 py-2 rounded-md 
                       hover:bg-red-700 focus:outline-none focus:ring-2 
                       focus:ring-red-500 focus:ring-offset-2"
            >
              {t('header.logout')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoPassengerAssigned;