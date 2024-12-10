import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useVIPData } from '../../context/VIPDataContext';
import { 
  Users, 
  MessageSquare, 
  Thermometer,
  PlaneLanding,
  ChevronRight,
  ChevronLeft,
  Settings,
  UserCog
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { notifications, requests } = useVIPData();
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();

  const unreadEmergencies = notifications.filter(n => {
    // Only count emergency notifications for pending emergency requests
    if (n.type === 'emergency' && !n.read && n.requestId) {
      const request = requests.find(r => r.id === n.requestId);
      return request && request.status === 'pending';
    }
    return false;
  }).length;

  const unreadRequests = notifications.filter(n => {
    // Only count notifications for pending requests
    if (n.type === 'request' && !n.read && n.requestId) {
      const request = requests.find(r => r.id === n.requestId);
      return request && request.status === 'pending';
    }
    return false;
  }).length;
  
  const staffMenuItems = [
    {
      label: t('sidebar.staff.seatManagement'),
      path: '/seats',
      icon: Settings
    },
    {
      label: t('sidebar.staff.passengers'),
      path: '/passengers',
      icon: Users
    },
    {
      label: t('sidebar.staff.requests'),
      path: '/requests',
      icon: MessageSquare,
      notification: unreadRequests ? t('sidebar.notifications.newRequests', { count: unreadRequests }) : null,
      notificationColor: 'bg-yellow-500'
    },
    {
      label: t('sidebar.staff.cabinControl'),
      path: '/cabin',
      icon: Thermometer,
      notification: unreadEmergencies ? t('sidebar.notifications.emergency', { count: unreadEmergencies }) : null,
      notificationColor: 'bg-red-500'
    },
    {
      label: t('sidebar.staff.flightInfo'),
      path: '/flight',
      icon: PlaneLanding
    }
  ];

  const seatMenuItems = [
    { 
      label: t('sidebar.vip.preferences'),
      path: '/preferences', 
      icon: UserCog 
    },
    { 
      label: t('sidebar.vip.requests'),
      path: '/requests',
      icon: MessageSquare,
      notification: user?.role === 'seat' ? 
        notifications.filter(n => {
          if (!n.read && n.type === 'request' && n.seatId === user.username && n.requestId) {
            const request = requests.find(r => r.id === n.requestId);
            return request && request.status === 'pending';
          }
          return false;
        }).length : null,
      notificationColor: 'bg-yellow-500'
    },
    {
      label: t('sidebar.vip.flightInfo'),
      path: '/flight',
      icon: PlaneLanding,
      notification: notifications.filter(n => !n.read && n.type === 'flight').length || null,
      notificationColor: 'bg-blue-500'
    }
  ];

  const menuItems = user?.role === 'staff' ? staffMenuItems : seatMenuItems;

  return (
    <aside 
      className={`bg-white/80 dark:bg-navy-800/80 backdrop-blur-sm shadow-md 
                  border-r border-gray-200 dark:border-navy-600
                  transition-all duration-300 flex flex-col ${
        isExpanded ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex-1">
        <nav className="mt-6 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 mb-2 rounded-md transition-colors relative ${
                  location.pathname === item.path
                    ? 'bg-blue-100 dark:bg-navy-600 text-blue-900 dark:text-blue-100'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-700 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <div className="relative">
                  <Icon size={20} />
                  {item.notification && !isExpanded && (
                    <span
                      className={`absolute -top-2 -right-2 ${item.notificationColor} 
                        w-4 h-4 rounded-full text-white text-xs flex items-center 
                        justify-center animate-pulse`}
                    />
                  )}
                </div>
                <div className={`flex-1 flex justify-between items-center transition-opacity ${
                  isExpanded ? 'opacity-100' : 'opacity-0'
                }`}>
                  <span className="whitespace-nowrap">{item.label}</span>
                  {item.notification && (
                    <span
                      className={`${item.notificationColor} text-white text-xs px-2 
                        py-1 rounded-full animate-pulse ml-2`}
                    >
                      {item.notification}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-2 m-2 text-gray-500 dark:text-gray-400 
                   hover:text-gray-700 dark:hover:text-gray-200 
                   hidden md:block transition-colors duration-200"
      >
        {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>
    </aside>
  );
};

export default Sidebar;