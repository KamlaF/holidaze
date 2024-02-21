import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/authStore';
import Layout from './components/Layout';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import VenueList from './components/VenueList';
import Home from './components/Home';
import VenueDetail from './components/VenueDetail';
import MyBookings from './components/MyBookings';

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
          <Route path="/venues" element={<VenueList />} />
          <Route path="/venues/:id" element={<VenueDetail />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/my-bookings" element={isAuthenticated ? <MyBookings /> : <Navigate to="/login" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;













