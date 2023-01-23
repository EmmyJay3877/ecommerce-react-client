import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useStateContext } from '../../StateContext'
import LoadingIcon from '../LoadingIcon'

const ForgetPassword = () => {

    const {checkEmail, response, setRes, showLoading, setShowLoading} = useStateContext()

    useEffect(()=>{
        setRes()
        setShowLoading(false)
    }, [])

    const [email, setEmail] = useState('')

    const [errors, setError] = useState('');

    const handleChange = (event) => {
        const { value } = event.target;
        setEmail(value);
      };

    const handleSubmit = async(event) => {
        event.preventDefault()
    
        let newError = ''

        if (email.length === 0) {
          newError = 'This feild is required';
        }
        setError(newError);
    
        // If there are no errors, submit the form data
        if (newError === '') {
          setShowLoading(true)
          // Submit the form data here
          await checkEmail(event)
          let inputs = document.querySelectorAll("input")
          inputs.forEach((input) => (input.value = ""))
          }
      }
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">

    <h1 className="font-bold text-2xl">Type in your email address</h1>
    <form className="flex flex-col bg-white rounded shadow-lg p-12 mt-12">
        {
          response && (
            <p className="text-red-500 font-semibold text-xs mb-6">{response}</p>
          )
        }
      <label className="font-semibold text-xs" >Verified Email Address</label>
      <input 
      name='email'
      value={email}
      onChange={handleChange}
      id='email'
      className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" 
      type="text"
      />
      {errors && (
          <p className="text-red-500 flex font-semibold text-xs">{errors}</p>
      )}
      <button 
      className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
      onClick={(e) => handleSubmit(e)}
      type='submit'
      >{showLoading===true ? <LoadingIcon/> : 'Proceed'}</button>
    </form>
  
  </div>
  )
}

export default ForgetPassword