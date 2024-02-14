import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useAuthStore from '../store/authStore';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string()
    .email('Invalid email')
    .required('Email is required')
    .matches(/@stud.noroff.no$/, 'Email must be a Noroff student email'),
  password: yup.string().required('Password is required'),
  isManager: yup.boolean(),
}).required();

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    // Transform data before sending it
    const transformedData = {
      ...data,
      venueManager: data.isManager, // Transforms 'isManager' to a field expected by the backend
    };

    try {
      const response = await fetch('https://api.noroff.dev/api/v1/holidaze/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformedData), // Use transformed data
      });

      if (response.ok) {
        console.log('Registration successful', await response.json());
        // Optionally set user role in state here, if needed
        // For example, if you want to log in the user right away
        useAuthStore.getState().setUser({ isAuthenticated: true, userRole: transformedData.venueManager ? 'manager' : 'user' });
        navigate('/login'); // Redirect to the login page
      } else {
        const errorData = await response.json();
        console.error('Registration failed', errorData);
      }
    } catch (error) {
      console.error('There was an error sending the request', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
        {/* Name field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" {...register('name')} />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
        </div>

        {/* Email field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" {...register('email')} />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
        </div>

        {/* Password field */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" {...register('password')} />
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
        </div>

        {/* Manager checkbox */}
        <div className="mb-6">
          <label className="inline-flex items-center">
            <input className="form-checkbox h-5 w-5 text-gray-600" type="checkbox" {...register('isManager')} />
            <span className="ml-2 text-gray-700">Register as a manager</span>
          </label>
        </div>

        {/* Submit button */}
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;


