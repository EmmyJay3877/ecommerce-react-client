import React from 'react'
import { useState } from 'react';
import { useStateContext } from '../../StateContext'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import LoadingIcon from '../LoadingIcon';


const Signup = () => {

  const { response, signup, setRes, setShowLoading, showLoading } = useStateContext()

    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    useEffect(()=>{
      setRes()
      setShowLoading(false)
    }, [])
  
    const [errors, setErrors] = useState({});
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async(event) => {
      event.preventDefault();
  
      // Validate the form data
      const newErrors = {};
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long';
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email address';
      }
      setErrors(newErrors);
  
      // If there are no errors, submit the form data
      if (Object.keys(newErrors).length === 0) {
        setShowLoading(true)
        // Submit the form data here
        await signup(event)
        
        let inputs = document.querySelectorAll("input")
        inputs.forEach((input) => (input.value = ""))
      }

    }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">

    <h1 className="font-semibold text-lg">Sign up with your credentials</h1>
    <form className="flex flex-col bg-white rounded shadow-lg p-12 mt-3" action="">
        {
          response && (
            <p className="text-red-500 font-semibold text-xs mb-6">{response}</p>
          )
        }
      <label className="font-semibold text-xs" >Username</label>
      <input 
      required
      name='username'
      value={formData.username}
      onChange={handleChange}
      className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" 
      type="text"
      />
      <label className="font-semibold text-xs mt-3" >Email</label>
      <input 
      required
      name='email'
      value={formData.email}
      onChange={handleChange}
      id='email'
      className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" 
      type="text"
      />
      {errors.email && (
          <p className="text-red-500 flex font-semibold text-xs">{errors.email}</p>
      )}
      <label className="font-semibold text-xs mt-3" >Password</label>
      <input 
      required
      value={formData.password}
      onChange={handleChange}
      id='password'
      name='password'
      className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
      type="password"
      />
      {errors.password && (
          <p className="text-red-500 flex font-semibold text-xs mt-2">{errors.password}</p>
      )}
      <label className="font-semibold text-xs mt-3" >Confirm Password</label>
      <input 
      required
      value={formData.confirmPassword}
      onChange={handleChange}
      name='confirmPassword'
      className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
      type="password"
      />
      {errors.confirmPassword && (
          <p className="text-red-500 flex font-semibold text-xs mt-2">{errors.confirmPassword}</p>
      )}
      <button 
      className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-6 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
      onClick={(e) =>handleSubmit(e)}
      type='submit'
      >{showLoading===true ? <LoadingIcon/> : 'Signup'}</button>
      <div className="flex mt-6 justify-center items-center flex-col text-xs space-y-4">
        <div>
        <a className="text-black">Already have an account?  </a>
        &nbsp;
        <Link to={'/login'}>
        <button className="text-blue-400 hover:text-blue-500" >Log in</button>
        </Link>
        </div>
        <div>
        <Link to={'/'}>
        <button className="text-blue-400 hover:text-blue-500">Go back 🔙</button>
        </Link>
        </div>
      </div>
    </form>
  </div>
    )
  }

export default Signup