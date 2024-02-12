import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import RegistrationForm from './components/RegistrationForm'; // Import the RegistrationForm component
// Import other components as needed

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<div>Home Page Content</div>} />
          <Route path="/venues" element={<div>Venues Page Content</div>} />
          <Route path="/register" element={<RegistrationForm />} /> {/* Updated to use RegistrationForm */}
          <Route path="/login" element={<div>Login Form</div>} /> {/* Update this when you have a LoginForm */}
          {/* Define other routes as needed */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;




