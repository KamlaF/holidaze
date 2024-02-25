import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <nav className="bg-background text-text-1 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-xl hover:text-accent-1">Holidaze</Link>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        <div className={`md:flex md:items-center ${isMenuOpen ? 'flex' : 'hidden'} flex-col md:flex-row absolute md:relative top-16 right-0 md:top-auto md:right-auto bg-background md:bg-transparent p-4 md:p-0`}>
          <Link to="/" className="block mt-2 md:mt-0 mr-4 md:hover:text-accent-1">Home</Link>
          {isAuthenticated && userRole === 'manager' ? (
            <>
              <Link to="/venues" className="block mt-2 md:mt-0 mr-4 md:hover:text-accent-1">Venues</Link>
              <Link to="/profile" className="block mt-2 md:mt-0 mr-4 md:hover:text-accent-1">Profile</Link>
            </>
          ) : isAuthenticated ? (
            <>
              <Link to="/my-bookings" className="block mt-2 md:mt-0 mr-4 md:hover:text-accent-1">My Bookings</Link>
              <Link to="/profile" className="block mt-2 md:mt-0 mr-4 md:hover:text-accent-1">Profile</Link>
            </>
          ) : null}
          {isAuthenticated ? (
            <button onClick={handleLogout} className="mt-2 md:mt-0 md:hover:text-accent-1">
              Logout
            </button>
          ) : (
            <>
              <Link to="/register" className="block mt-2 md:mt-0 mr-4 md:hover:text-accent-1">Register</Link>
              <Link to="/login" className="block mt-2 md:mt-0 md:hover:text-accent-1">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;












