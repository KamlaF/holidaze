import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');

  // Validation schema for the login form
  const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  }).required();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://api.noroff.dev/api/v1/holidaze/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem('authData', JSON.stringify({
          accessToken: responseData.accessToken,
          name: responseData.name, // Storing the user's name for booking retrieval
          userRole: responseData.venueManager ? 'manager' : 'user', // Determine user role
        }));

        // Update global auth state with user details
        useAuthStore.getState().setUser({
          isAuthenticated: true,
          userRole: responseData.venueManager ? 'manager' : 'user',
          name: responseData.name, // Include name in the global auth state
          accessToken: responseData.accessToken,
        });

        navigate('/'); // Redirect to home or another appropriate page
      } else {
        // Provide feedback for failed login attempt
        setLoginError('Login failed. Please check your email and password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-10">
      {/* Display login error message */}
      {loginError && <p className="mb-4 text-red-500 text-sm text-center">{loginError}</p>}

      {/* Email Input Field */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
        <input type="email" id="email" {...register('email')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
      </div>

      {/* Password Input Field */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
        <input type="password" id="password" {...register('password')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
        {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Log in</button>
      </div>
    </form>
  );
};

export default LoginForm;


