/*
 control panel for a single cabin zone
 has sliders for:
 - temperature (18-30°C)
 - lighting brightness (0-100%)
 
 updates happen in real time when sliding
 used in CabinControls for each zone (front/mid)
*/
import React from 'react';
import { CabinZone } from '../../types';
import { useVIPData } from '../../context/VIPDataContext';

interface CabinZoneCardProps {
  zone: CabinZone;
}

const CabinZoneCard: React.FC<CabinZoneCardProps> = ({ zone }) => {
  const { updateCabinZone } = useVIPData();

  const handleInputChange = (
    type: 'temperature' | 'brightness',
    value: number
  ) => {
    const updatedZone = {
      ...zone,
      [type]: Number(value)
    };
    updateCabinZone(updatedZone);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">{zone.name}</h4>
      
      {/* temperature control */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-700">Temperature</label>
          <span className="text-sm text-gray-600">{zone.temperature}°C</span>
        </div>
        <input
          type="range"
          min="18"
          max="30"
          step="1"
          value={zone.temperature}
          onChange={(e) => handleInputChange('temperature', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>18°C</span>
          <span>30°C</span>
        </div>
      </div>

      {/* brightness control */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-700">Lighting</label>
          <span className="text-sm text-gray-600">{zone.brightness}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={zone.brightness}
          onChange={(e) => handleInputChange('brightness', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};

export default CabinZoneCard;