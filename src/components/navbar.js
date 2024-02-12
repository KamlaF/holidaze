// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Navbar = () => {
  const { isAuthenticated, userRole } = useAuthStore();

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold">
        Holidaze
      </Link>
      <div>
        <Link to="/" className="mr-4 hover:underline">Home</Link>
        <Link to="/venues" className="mr-4 hover:underline">Venues</Link>
        {isAuthenticated ? (
          <>
            {userRole === 'manager' ? (
              <Link to="/my-venues" className="mr-4 hover:underline">My Venues</Link>
            ) : (
              <Link to="/my-bookings" className="mr-4 hover:underline">My Bookings</Link>
            )}
            <button onClick={() => useAuthStore.getState().clearUser()} className="hover:underline">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className="mr-4 hover:underline">Register</Link>
            <Link to="/login" className="hover:underline">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
