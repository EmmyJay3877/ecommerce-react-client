import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useStateContext } from '../../StateContext'
import LoadingIcon from '../LoadingIcon'

const ResetPassword = () => {
    
  const { updatePassword, response, setRes, setShowLoading, showLoading } = useStateContext()

  useEffect(()=>{
    setRes()
    setShowLoading(false)
  }, [])

    const [ formData, setFormData ] = useState({
        newPassword: '',
        confirmNewPassword: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event)=>{
        const { name, value } = event.target;
        setFormData({...formData, [name]: value});
    }
  
    const handleSubmit = async (event)=>{
        event.preventDefault();
    
        // Validate the form data
        let newErrors = {};
        if (formData.newPassword.length < 8) {
          newErrors.newPassword = 'Password must be at least 8 characters long';
        }
        if (formData.newPassword !== formData.confirmNewPassword) {
          newErrors.confirmNewPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
  
        // If there are no errors, submit the form data
        if (Object.keys(newErrors).length === 0) {
          setShowLoading(true)
          // Submit the form data here
          await updatePassword(event)
          let inputs = document.querySelectorAll("input")
          inputs.forEach((input) => (input.value = ""))
        }
      }
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">

    <h1 className="font-bold text-2xl">Reset Password</h1>
    <form className="flex flex-col bg-white rounded shadow-lg p-12 mt-12">
        {
          response && (
            <p className="text-red-500 font-semibold text-xs mb-6">{response}</p>
          )
        }
      <label className="font-semibold text-xs" >New Password</label>
      <input 
      name='newPassword'
      value={formData.newPassword}
      onChange={handleChange}
      id='newPassword'
      className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" 
      type="password"
      />
      {errors.newPassword && (
          <p className="text-red-500 flex font-semibold text-xs">{errors.newPassword}</p>
      )}
      <label className="font-semibold text-xs" >Confirm New Password</label>
      <input 
      name='confirmNewPassword'
      value={formData.confirmNewPassword}
      onChange={handleChange}
      id='confirmNewPassword'
      className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" 
      type="password"
      />
      {errors.confirmNewPassword && (
          <p className="text-red-500 flex font-semibold text-xs">{errors.confirmNewPassword}</p>
      )}
      <button 
      className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
      onClick={(e) =>handleSubmit(e)}
      type='submit'
      >{showLoading===true ? <LoadingIcon/> : 'Proceed'}</button>
    </form>
  
  </div>
  )
}

export default ResetPassword