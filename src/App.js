import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import RegistrationForm from './components/RegistrationForm'; // Import the RegistrationForm component
import LoginForm from './components/LoginForm'; // Import the LoginForm component

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<div>Home Page Content</div>} />
          <Route path="/venues" element={<div>Venues Page Content</div>} />
          <Route path="/register" element={<RegistrationForm />} /> {/* Updated to use RegistrationForm */}
          <Route path="/login" element={<LoginForm />} /> {/* Updated to use LoginForm */}
          {/* Define other routes as needed */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;





