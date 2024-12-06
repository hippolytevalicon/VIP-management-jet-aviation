import React, { useState } from 'react';
import { RequestType } from '../../types';
import { useVIPData } from '../../context/VIPDataContext';

interface NewRequestFormProps {
  passengerId: string;
}

const NewRequestForm: React.FC<NewRequestFormProps> = ({ passengerId }) => {
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
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        New Service Request
      </button>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">New Service Request</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Request Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as RequestType })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="meal">Meal</option>
            <option value="drink">Drink</option>
            <option value="temperature">Temperature</option>
            <option value="light">Light</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Request Details
          </label>
          <textarea
            value={formData.details}
            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
            required
            placeholder="Enter request details..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default NewRequestForm;