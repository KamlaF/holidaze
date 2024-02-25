import React from 'react';
import Navbar from './navbar';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background text-white p-4">
        <Navbar /> {/* Use Navbar component here */}
      </header>

      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>

      <footer className="bg-background text-white p-4">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} Holidaze. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;

