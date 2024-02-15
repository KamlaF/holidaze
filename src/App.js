import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import VenueList from './components/VenueList';
import Home from './components/Home';
import VenueDetail from './components/VenueDetail';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/venues" element={<VenueList />} />
          <Route path="/venues/:id" element={<VenueDetail />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;









