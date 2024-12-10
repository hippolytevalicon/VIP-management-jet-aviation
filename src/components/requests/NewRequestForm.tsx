import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RequestType } from '../../types';
import { useVIPData } from '../../context/VIPDataContext';

interface NewRequestFormProps {
  passengerId: string;
}

const NewRequestForm: React.FC<NewRequestFormProps> = ({ passengerId }) => {
  const { t } = useTranslation();
  const { addRequest } = useVIPData();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: 'meal' as RequestType,
    details: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRequest({
      ...formData,
      passengerId,
      status: 'pending'
    });
    setFormData({
      type: 'meal',
      details: ''
    });
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-md 
                   hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
      >
        {t('request.new.button')}
      </button>
    );
  }

  return (
    <div className="bg-white dark:bg-navy-700 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {t('request.new.title')}
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200
                     transition-colors duration-200"
        >
          {t('request.new.cancel')}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            {t('request.new.type.label')}
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as RequestType })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-navy-500 
                      bg-white dark:bg-navy-600 text-gray-900 dark:text-white
                      shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400"
            required
          >
            <option value="meal">{t('request.new.type.meal')}</option>
            <option value="drink">{t('request.new.type.drink')}</option>
            <option value="temperature">{t('request.new.type.temperature')}</option>
            <option value="light">{t('request.new.type.light')}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            {t('request.new.details.label')}
          </label>
          <textarea
            value={formData.details}
            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-navy-500 
                      bg-white dark:bg-navy-600 text-gray-900 dark:text-white
                      shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400"
            rows={3}
            required
            placeholder={t('request.new.details.placeholder')}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-md 
                     hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
        >
          {t('request.new.submit')}
        </button>
      </form>
    </div>
  );
};

export default NewRequestForm;