// src/pages/Login.jsx
import React from 'react';
import Navbar from '../Component/Login/NavBar';
import SignInForm from '../Component/Login/SignInForm';
import Footer from '../Component/Login/Footer';

const Login = () => {
  return (
    <div className="min-h-screen relative text-white">
      
      {/* Background Image */}
      <div className="absolute inset-0 bg-center bg-cover bg-no-repeat bg-[url('/src/assets/netflixBg.jpg')]"></div>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-transparent opacity-30 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex flex-1 items-center o justify-center px-4 py-8">
          <SignInForm />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Login;