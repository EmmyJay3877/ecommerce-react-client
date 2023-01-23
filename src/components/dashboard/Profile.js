import React from 'react'
import { useState } from 'react'
import DashboardNavBar from './DashboardNavBar'
import { useStateContext } from '../../StateContext'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import LoadingIcon from '../LoadingIcon'

const Profile = () => {

    const { updateProfile, updatePassword, pswrdResponse, setPswrdResponse, setRes, response, showLoading, setShowLoading } = useStateContext()

    useEffect(()=>{
      setPswrdResponse()
      setRes()
      setShowLoading(false)
    }, [])

    const [ formData, setFormData ] = useState({
        phone: 0,
        city: '',
        region: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event)=>{
        const { name, defaultValue } = event.target;
        setFormData({...formData, [name]: defaultValue});
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
            await updateProfile(event)
        }   
    }

    const handlePassword = (event)=>{
      const { name, value } = event.target;
      setFormData({...formData, [name]: value});
  }

    const handlePasswordChange = async(event)=>{
      event.preventDefault();
      // Validate the form data
      const newErrors = {};
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
      }
    }

    const { customer, fetchCustomer } = useStateContext()
    
    useEffect(()=>{
      fetchCustomer()
    }, [])

    const { username, city, email ,phone_number, region} = customer

  return (
    <div>
        <div>
            <DashboardNavBar />
        </div>
      <form>
    <div className="h-fit flex items-center justify-center bg-gray-100">
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
  <div className="container max-w-screen-lg mx-auto">
    <div>
      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          <div className="text-gray-600">
            <p className="font-medium text-lg">Personal Details</p>
            <p>Edit and Save your profile</p>
          </div>

          <div className="lg:col-span-2">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-3">
                <label htmlFor="username">Username</label>
                <input 
                type="text" 
                name="full_name" 
                readOnly 
                defaultValue={username} 
                id="full_name" 
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                placeholder='Username'  />
              </div>

              <div className="md:col-span-5">
                <label htmlFor="email">Email Address</label>
                <input 
                type="text" 
                name="email" 
                id="email" 
                readOnly 
                defaultValue={email} 
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                placeholder="email@domain.com" />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="phone">Phone</label>
                <input 
                type="tel" 
                name="phone" 
                id="phone" 
                pattern="/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/"
                defaultValue={phone_number} 
                // value={formData.phone}
                onChange={handleChange}
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"   
                placeholder="Phone" />
                {errors.phone && (
                <p className="text-red-500 text-xs font-semibold">{errors.phone}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="city">City</label>
                <input 
                type="text" 
                name="city" 
                id="city" 
                defaultValue={city}
                // value={formData.city} 
                onChange={handleChange}
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"   
                placeholder="City" />
                {errors.city && (
                <p className="text-red-500 text-xs font-semibold">{errors.city}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="country">Country / region</label>
                <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                  <input 
                  type="text"
                  name="region" 
                  id="region" 
                  defaultValue={region}
                  // value={formData.region}
                  onChange={handleChange}
                  placeholder="Country" 
                  className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"   
                  />
                </div>
                {errors.region && (
                <p className="text-red-500 text-xs font-semibold">{errors.region}</p>
                )}
              </div>



              <div className="md:col-span-5">
                <div className="inline-flex items-center">
                  <input type="checkbox" name="billing_same" id="billing_same" className="htmlForm-checkbox" />
                  <label htmlFor="billing_same" className="ml-2">My billing address is different than above.</label>
                </div>
              </div>
              {
                response && (
                  <p className="text-red-500 text-sm font-semibold">{response}</p>
                )
              }
            </div>
            <div className='flex justify-between mt-10'>
                <Link to={"/customer"}>
              <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                  <button className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Back</button>
                </div>
              </div>
                </Link>
              <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                  <button 
                  type='submit' 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={e=>{
                    handleSubmit(e)
                  }}
                  >{showLoading===true ? <LoadingIcon/> : 'Update'}</button>
                </div>
              </div>
            </div>
          </div>
          <div className="text-gray-600 mt-14">
            <p className="font-medium text-lg">Security Details</p>
            <p>Edit and Update your password</p>
          </div>

          <div className="lg:col-span-2 mt-14">
            {
              pswrdResponse && (
                <p className="text-red-500 text-xs font-semibold">{pswrdResponse}</p>
              )
            }
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-3">
                <label>New Password</label>
                <input 
                value={pswrdResponse ? '': formData?.newPassword} 
                onChange={handlePassword}
                required
                type="password" 
                name="newPassword"  
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"   />
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-xs font-semibold">{errors.newPassword}</p>
              )}

              <div className="md:col-span-3">
                <label>Confirm New Password</label>
                <input 
                value={pswrdResponse ? '': formData?.confirmNewPassword}
                onChange={handlePassword}
                required
                name='confirmNewPassword'
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                type="password"
                />
              </div>
              {errors.confirmNewPassword && (
                <p className="text-red-500 text-xs font-semibold">{errors.confirmNewPassword}</p>
              )}
            </div>
            <div className='flex mt-6 gap-40'>
                <Link to={"/customer"}>
              <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                  <button className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Back</button>
                </div>
              </div>
                </Link>
              <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                  <button 
                  type='submit' 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={e=>handlePasswordChange(e)}
                  >{showLoading===true ? <LoadingIcon/> : 'Update'}</button>
                </div>
              </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</form>
</div>
  )
}

export default Profile