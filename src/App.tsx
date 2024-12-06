import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { VIPDataProvider } from './context/VIPDataContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Login from './components/auth/Login';
import PassengerList from './components/passenger/PassengerList';
import RequestList from './components/requests/RequestList';
import CabinControls from './components/cabin/CabinControls';
import FlightInfo from './components/flight/FlightInfo';
import SeatManagement from './components/staff/SeatManagement';
import PassengerPreferencesView from './components/passenger/PassengerPreferences';

//protected route wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <VIPDataProvider>
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/login" element={<Navigate to="/" replace />} />
            
            {/*staff-only routes*/}
            {user?.role === 'staff' && (
              <>
                <Route path="/seats" element={<SeatManagement />} />
                <Route path="/passengers" element={<PassengerList />} />
                <Route path="/cabin" element={<CabinControls />} />
              </>
            )}
            
            {/*passenger-only routes*/}
            {user?.role === 'seat' && (
              <>
                <Route path="/preferences" element={<PassengerPreferencesView />} />
              </>
            )}
            
            {/*common routes*/}
            <Route path="/requests" element={<RequestList />} />
            <Route path="/flight" element={<FlightInfo />} />
            
            {/*default redirect based on role*/}
            <Route 
              path="/" 
              element={
                <Navigate 
                  to={user?.role === 'staff' ? "/passengers" : "/requests"} 
                  replace 
                />
              } 
            />
          </Routes>
        </div>
      </Layout>
    </VIPDataProvider>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;