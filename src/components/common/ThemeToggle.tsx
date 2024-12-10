import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-colors duration-200
                dark:bg-navy-800 dark:text-white
                bg-white/80 text-gray-800
                hover:bg-gray-100 dark:hover:bg-navy-700
                focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-navy-400"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Moon size={20} className="text-yellow-400" />
      ) : (
        <Sun size={20} className="text-amber-500" />
      )}
    </button>
  );
};

export default ThemeToggle;