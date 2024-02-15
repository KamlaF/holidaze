import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import RegistrationForm from './components/RegistrationForm'; // Import the RegistrationForm component
import LoginForm from './components/LoginForm'; // Import the LoginForm component
import VenueList from './components/VenueList'; // Import the VenueList component
import Home from './components/Home'; // Import the Home component

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Updated to use Home component */}
          <Route path="/venues" element={<VenueList />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          {/* Define other routes as needed */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;







