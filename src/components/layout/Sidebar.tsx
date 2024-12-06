//sidebar, different whether you're a VIP or a staff member
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const { notifications } = useVIPData();
  const [isExpanded, setIsExpanded] = useState(false);

  const unreadEmergencies = notifications.filter(n => 
    n.type === 'emergency' && !n.read
  ).length;

  const unreadRequests = notifications.filter(n =>
    n.type === 'request' && !n.read
  ).length;

  const staffMenuItems = [
    {
      label: 'Seat Management',
      path: '/seats',
      icon: Settings,
      notification: unreadEmergencies ? `${unreadEmergencies} Emergency!` : null,
      notificationColor: 'bg-red-500'
    },
    {
      label: 'Passengers',
      path: '/passengers',
      icon: Users
    },
    {
      label: 'Requests',
      path: '/requests',
      icon: MessageSquare,
      notification: unreadRequests ? `${unreadRequests} new` : null,
      notificationColor: 'bg-yellow-500'
    },
    {
      label: 'Cabin Control',
      path: '/cabin',
      icon: Thermometer
    },
    {
      label: 'Flight Info',
      path: '/flight',
      icon: PlaneLanding
    }
  ];

  const seatMenuItems = [
    { 
      label: 'Your Preferences', 
      path: '/preferences', 
      icon: UserCog 
    },
    { 
      label: 'Requests', 
      path: '/requests',
      icon: MessageSquare,
      notification: user?.role === 'seat' ? notifications.filter(n => 
        !n.read && n.type === 'request' && n.seatId === user.username
      ).length : null,
      notificationColor: 'bg-yellow-500'
    },
    {
      label: 'Flight Info',
      path: '/flight',
      icon: PlaneLanding,
      notification: notifications.filter(n => 
        !n.read && n.type === 'flight'
      ).length || null,
      notificationColor: 'bg-blue-500'
    }
  ];

  const menuItems = user?.role === 'staff' ? staffMenuItems : seatMenuItems;

  return (
    <aside 
      className={`bg-white shadow-md transition-all duration-300 flex flex-col ${
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
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
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
        className="p-2 m-2 text-gray-500 hover:text-gray-700 hidden md:block"
      >
        {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>
    </aside>
  );
};

export default Sidebar;