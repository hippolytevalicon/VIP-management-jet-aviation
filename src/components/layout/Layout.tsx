//layout, different whether you're a VIP or a staff member
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useVIPData } from '../../context/VIPDataContext';
import Header from './Header';
import Sidebar from './Sidebar';
import NoPassengerAssigned from '../error/NoPassengerAssigned';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const { seats } = useVIPData();

  const hasPassengerAssigned = () => {
    if (user?.role === 'staff') return true;
    if (!(user?.role === 'seat')) return true;
    
    const currentSeat = seats.find(s => s.id === user?.username);
    return !!currentSeat?.assignedPassengerId;
  };

  if (!hasPassengerAssigned()) {
    return <NoPassengerAssigned />;
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat blur-[2px]"
        style={{
          backgroundImage: 'url(/monde.jpg)',
        }}
      >
        {/* Subtle dark overlay for better readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 transition-all duration-300">
            <div className="bg-white/85 backdrop-blur-sm rounded-lg shadow-2xl p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;