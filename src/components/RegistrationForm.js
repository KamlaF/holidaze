import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


const schema = yup.object({
  name: yup.string().required('Name is required')
            .matches(/^\w+$/, 'Name must not contain punctuation symbols apart from underscore'),
  email: yup.string()
            .email('Invalid email')
            .required('Email is required')
            .matches(/@stud\.noroff\.no$/, 'Email must be a Noroff student email'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long'),
  isManager: yup.boolean(),
  avatar: yup.string().url('Must be a valid URL').notRequired(), // Optional avatar URL with validation
}).required();

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

const onSubmit = async data => {
  try {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      venueManager: data.isManager || false, // Ensure boolean value for venueManager
      avatar: data.avatar || '', // Include avatar URL in the payload, default to empty string if not provided
    };

    const response = await fetch('https://api.noroff.dev/api/v1/holidaze/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log('Registration successful', responseData);

      // Store the token in local storage
      localStorage.setItem('token', responseData.token); 
      navigate('/login'); 
    } else {
      const errorData = await response.json();
      console.error('Registration failed', errorData);
      alert('Registration failed: ' + (errorData.message || 'Unknown error'));
    }
  } catch (error) {
    console.error('There was an error sending the request', error);
    alert('An error occurred during registration. Please try again later.');
  }
};

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
        {/* Name Input */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <input id="name" type="text" {...register('name')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input id="email" type="email" {...register('email')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input id="password" type="password" {...register('password')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
        </div>
           {/* Avatar Input */}
        <div className="mb-4">
          <label htmlFor="avatar" className="block text-gray-700 text-sm font-bold mb-2">Avatar URL (Optional):</label>
          <input id="avatar" type="text" {...register('avatar')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          {errors.avatar && <p className="text-red-500 text-xs italic">{errors.avatar.message}</p>}
        </div>

        {/* Manager Checkbox */}
        <div className="mb-6">
          <label className="inline-flex items-center">
            <input type="checkbox" {...register('isManager')} className="form-checkbox h-5 w-5 text-gray-600" />
            <span className="ml-2 text-gray-700">Register as a manager</span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;

