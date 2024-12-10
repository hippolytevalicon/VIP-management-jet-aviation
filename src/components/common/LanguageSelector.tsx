import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'es', name: 'Español' },
  { code: 'it', name: 'Italiano' },
  { code: 'zh', name: '中文' }
];

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const { isDarkMode } = useTheme();

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <select
      value={i18n.language}
      onChange={(e) => changeLanguage(e.target.value)}
      className="px-4 py-2 text-sm font-medium 
                 border-2 border-gray-800 dark:border-white
                 text-gray-800 dark:text-white 
                 rounded-full bg-transparent
                 hover:bg-gray-50 dark:hover:bg-navy-700 
                 transition-colors duration-200 
                 focus:outline-none focus:ring-2 
                 focus:ring-gray-800 dark:focus:ring-white 
                 focus:ring-offset-2 dark:focus:ring-offset-navy-800 
                 cursor-pointer
                 dark:bg-transparent"
    >
      {languages.map((lang) => (
        <option 
          key={lang.code} 
          value={lang.code}
          className="bg-white dark:bg-navy-800 text-gray-800 dark:text-white"
        >
          {lang.name}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;