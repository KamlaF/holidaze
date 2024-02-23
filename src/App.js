import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/authStore';
import Layout from './components/Layout';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import VenueDetail from './components/VenueDetail';
import UpdateVenueForm from './components/UpdateVenueForm'; // Import the UpdateVenueForm component
import MyBookings from './components/MyBookings';
import Venues from './components/Venues';
import Profile from './components/Profile';

function App() {
  const { hydrateAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    hydrateAuth();
  }, [hydrateAuth]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/venues/:id" element={<VenueDetail />} />
          <Route path="/venues/update/:id" element={isAuthenticated ? <UpdateVenueForm /> : <Navigate to="/login" replace />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/my-bookings" element={isAuthenticated ? <MyBookings /> : <Navigate to="/login" replace />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />} />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;














