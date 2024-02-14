// src/components/LoginForm.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const LoginForm = () => {
  const navigate = useNavigate();

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
      // Anta at responseData inneholder et felt som indikerer om brukeren er en manager
      // Dette feltet kan variere avhengig av API-responsen; juster som nødvendig
      const userRole = responseData.venueManager ? 'manager' : 'user';
      useAuthStore.getState().setUser({ isAuthenticated: true, userRole });

      // Redirect basert på om brukeren er en manager eller ikke
      navigate('/');
    } else {
      console.error('Login failed');
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
};


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-10">
      {/* Email input */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
        <input type="email" id="email" {...register('email')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
      </div>

      {/* Password input */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
        <input type="password" id="password" {...register('password')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
        {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
      </div>

      {/* Submit button */}
      <div className="flex items-center justify-between">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Log in</button>
      </div>
    </form>
  );
};

export default LoginForm;

