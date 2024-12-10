/*
 control panel for a single cabin zone
 has sliders for:
 - temperature (18-30°C)
 - lighting brightness (0-100%)
 
 updates happen in real time when sliding
 used in CabinControls for each zone (front/mid)
*/
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CabinZone } from '../../types';
import { useVIPData } from '../../context/VIPDataContext';

interface CabinZoneCardProps {
  zone: CabinZone;
}

const CabinZoneCard: React.FC<CabinZoneCardProps> = ({ zone }) => {
  const { t } = useTranslation();
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

  // Convert zone ID to display name
  const zoneName = zone.id === 'Z1' ? 'Zone A (Front)' : 'Zone B (Middle)';

  // Calculate temperature color for visual feedback
  const getTemperatureColor = (temp: number) => {
    const normalizedTemp = (temp - 18) / (30 - 18);
    const hue = ((1 - normalizedTemp) * 240).toFixed(0);
    return `hsl(${hue}, 70%, ${normalizedTemp > 0.5 ? '60%' : '50%'})`;
  };

  // Calculate brightness gradient
  const getBrightnessGradient = (brightness: number) => {
    return `linear-gradient(to right, #374151 0%, #9CA3AF ${brightness}%, #E5E7EB ${brightness}%)`;
  };

  return (
    <div className="bg-white dark:bg-navy-700 rounded-xl shadow-lg overflow-hidden">
      {/* Card header with gradient background */}
      <div 
        className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 
                   dark:from-navy-800 dark:to-navy-900 border-b 
                   border-gray-200 dark:border-navy-600"
      >
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
          {zoneName}
        </h4>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Temperature control */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {t('cabin.zone.temperature.label')}
            </label>
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full transition-colors duration-200"
                style={{ backgroundColor: getTemperatureColor(zone.temperature) }}
              />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {zone.temperature}{t('cabin.zone.temperature.unit')}
              </span>
            </div>
          </div>
          <div className="relative">
            <input
              type="range"
              min="18"
              max="30"
              step="1"
              value={zone.temperature}
              onChange={(e) => handleInputChange('temperature', Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer
                       focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              style={{
                background: `linear-gradient(to right, 
                  ${getTemperatureColor(18)}, 
                  ${getTemperatureColor(24)}, 
                  ${getTemperatureColor(30)})`
              }}
            />
            <div className="absolute -bottom-5 w-full flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>18{t('cabin.zone.temperature.unit')}</span>
              <span>30{t('cabin.zone.temperature.unit')}</span>
            </div>
          </div>
        </div>

        {/* Brightness control */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {t('cabin.zone.lighting.label')}
            </label>
            <div className="flex items-center gap-2">
              <svg 
                viewBox="0 0 24 24" 
                fill="none"
                stroke="currentColor"
                className={`w-4 h-4 transition-opacity duration-200
                          text-gray-600 dark:text-gray-300
                          opacity-${Math.round(zone.brightness / 10)}`}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                />
              </svg>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {zone.brightness}{t('cabin.zone.lighting.unit')}
              </span>
            </div>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={zone.brightness}
              onChange={(e) => handleInputChange('brightness', Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer
                       focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              style={{
                background: getBrightnessGradient(zone.brightness)
              }}
            />
            <div className="absolute -bottom-5 w-full flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>0{t('cabin.zone.lighting.unit')}</span>
              <span>100{t('cabin.zone.lighting.unit')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabinZoneCard;