import React from 'react'
import { useStateContext } from '../../StateContext'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import LoadingIcon from '../LoadingIcon'


const Login = () => {

  const { response, login, setRes, setShowLoading, showLoading } = useStateContext()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  useEffect(()=>{
    setRes()
    setShowLoading(false)
  }, [])

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = async(event) => {
    event.preventDefault()

    const newErrors = {}
    if (formData.password.length === 0) {
      setShowLoading(false)
      newErrors.password = 'This feild is required';
    }
    if (formData.email.length === 0) {
      setShowLoading(false)
      newErrors.email = 'This feild is required';
    }
    setErrors(newErrors);

    // If there are no errors, submit the form data
    if (Object.keys(newErrors).length === 0) {
      // Submit the form data here
      await login(event)
      setFormData({email: '', password: ''})
      let inputs = document.querySelectorAll("input")
      inputs.forEach((input) => (input.value = ""))
      }
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">
    <h1 className="font-bold text-2xl">Welcome Back</h1>
    <form className="flex flex-col bg-white rounded shadow-lg p-12 mt-12">
        {
          response && (
            <p className="text-red-500 font-semibold text-xs mb-6">{response}</p>
          )
        }
      <label className="font-semibold text-xs" >Email</label>
      <input 
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
      <button 
      className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
      onClick={(e) =>{
        setShowLoading(true)
        handleSubmit(e)
      }}
      type='submit'
      >{showLoading===true ? <LoadingIcon/> : 'Login'}</button>
      <div className="flex mt-6 justify-center text-xs">
        <Link to={'/forgetpassword'}>
        <button className="text-blue-400 hover:text-blue-500 cursor-pointer">Forgot Password</button>
        </Link>
        <span className="mx-2 text-gray-300">/</span>
        <Link to={'/signup'}>
        <button className="text-blue-400 hover:text-blue-500" >Sign Up</button>
        </Link>
      </div>
    </form>
  
  </div>
  )
}

export default Login