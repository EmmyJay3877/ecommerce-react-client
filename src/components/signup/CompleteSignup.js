import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useStateContext } from '../../StateContext';
import LoadingIcon from '../LoadingIcon';

const CompleteSignup = () => {

    const { completeSignup, setRes, response, showLoading, setShowLoading } = useStateContext()

    const [ formData, setFormData ] = useState({
        phone: '',
        city: '',
        region: ''
    });

    useEffect(()=>{
      setRes()
      setShowLoading(false)
    }, [])

    const [searchparams] = useSearchParams()
    const token_data = searchparams.get('token')

    const [errors, setErrors] = useState({});

    const handleChange = (event)=>{
        const { name, value } = event.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = async(event)=>{
        event.preventDefault()

        const newErrors = {}
        if (formData.phone.length < 3){
            newErrors.phone = 'Phone number must be at least 6 characters'
        }
        if (formData.city.length < 3){
            newErrors.city = 'Invalid City'
        }
        if (formData.region.length < 3){
            newErrors.region = 'Invalid Region'
        }
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setShowLoading(true)
            // Submit the form data here
            await completeSignup(event, token_data)
            let inputs = document.querySelectorAll("input")
            inputs.forEach((input) => (input.value = ""))
        }   
    }
  return (
    <div>
<div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
  <div className="relative py-3 sm:max-w-xl sm:mx-auto">
    <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
      <div className="max-w-md mx-auto">
        <div className="flex items-center space-x-5">
          <div className=" flex flex-col items-center justify-center pl-2 font-semibold text-xl self-start text-gray-700">
            <h2 className="leading-relaxed">Registration is almost complete</h2>
            <p className='text-md'>One more step</p>
          </div>
        </div>
        <form name='form'>
        {
        response && (
       <p className="text-red-500 text-sm font-semibold">{response}</p>
        )
        }
        <div className="divide-y divide-gray-200">
          <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <div className="flex flex-col">
              <label className="leading-loose">Phone Number</label>
              <input
              name='phone' 
              type="tel" 
              value={formData.phone}
              onChange={handleChange}
              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" 
              placeholder="phone"
              required
              />
                {errors.phone && (
                <p className="text-red-500 text-xs font-semibold">{errors.phone}</p>
                )}
            </div>
            <div className="flex flex-col">
              <label className="leading-loose">City</label>
              <input 
              name='city'
              type="text" 
              value={formData.city}
              onChange={handleChange}
              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" 
              placeholder="city"
              required
              />
                {errors.city && (
                <p className="text-red-500 text-xs font-semibold">{errors.city}</p>
                )}
            </div>
            <div className="flex flex-col">
              <label className="leading-loose">Country / Region</label>
              <input 
              name='region'
              type="text" 
              value={formData.region}
              onChange={handleChange}
              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" 
              placeholder='region'
              required
              />
                {errors.region && (
                <p className="text-red-500 text-xs font-semibold">{errors.region}</p>
                )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
              <button 
              type='submit' 
              className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
              onClick={e=> handleSubmit(e)}
              >{showLoading===true ? <LoadingIcon/> : 'Submit'}</button>
          </div>
        </div>
        </form>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default CompleteSignup