import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Oppdater for å bruke tilstand for autentiseringsstatus og brukerrolle
  const [userRole, setUserRole] = useState(useAuthStore.getState().userRole);
  const [isAuthenticated, setIsAuthenticated] = useState(useAuthStore.getState().isAuthenticated);

 useEffect(() => {
  const unsubscribe = useAuthStore.subscribe(() => {
    const { isAuthenticated, userRole } = useAuthStore.getState();
    console.log("Updated state in Navbar:", { isAuthenticated, userRole });
    setIsAuthenticated(isAuthenticated);
    setUserRole(userRole);
  });

  return () => unsubscribe();
}, []);


  const handleLogout = () => {
    useAuthStore.getState().clearUser();
  };

  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="font-bold">Holidaze</Link>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      <div className={`mt-4 md:mt-0 ${isMenuOpen ? 'block' : 'hidden'} md:flex md:items-center`}>
        <Link to="/" className="block mt-2 md:mt-0 mr-4 hover:underline">Home</Link>
        {isAuthenticated && userRole === 'manager' ? (
          <>
            <Link to="/venues" className="block mt-2 md:mt-0 mr-4 hover:underline">Venues</Link>
            <Link to="/profile" className="block mt-2 md:mt-0 mr-4 hover:underline">Profile</Link>
          </>
        ) : isAuthenticated ? (
          <>
            <Link to="/my-bookings" className="block mt-2 md:mt-0 mr-4 hover:underline">My Bookings</Link>
            <Link to="/profile" className="block mt-2 md:mt-0 mr-4 hover:underline">Profile</Link>
          </>
        ) : null}
        {isAuthenticated ? (
          <button onClick={handleLogout} className="mt-2 md:mt-0 hover:underline">
            Logout
          </button>
        ) : (
          <>
            <Link to="/register" className="block mt-2 md:mt-0 mr-4 hover:underline">Register</Link>
            <Link to="/login" className="block mt-2 md:mt-0 hover:underline">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;









