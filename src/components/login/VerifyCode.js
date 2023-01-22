import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useStateContext } from '../../StateContext'

const VerifyCode = () => {

    const {checkCode, response, setRes, resendCode, deleteCode} = useStateContext()

    const [searchparams] = useSearchParams()
    const id = searchparams.get('id')

    useEffect(()=>{
        setRes()
        deleteCode(id)
    }, [])

    const [code, setCode] = useState('')

    const [errors, setError] = useState('');

    const handleChange = (event) => {
        const { value } = event.target;
        setCode(value);
      };

    const handleSubmit = async(event, id) => {
        event.preventDefault()
    
        let newError = ''

        if (code.length === 0) {
          newError = 'Invalid Code';
        }
        setError(newError);
    
        // If there are no errors, submit the form data
        if (newError === '') {
          // Submit the form data here
          await checkCode(event, id)
          let inputs = document.querySelectorAll("input")
          inputs.forEach((input) => (input.value = ""))
          }
      }
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">

    {/* <h1 className="font-bold text-2xl">Type in your email address</h1> */}
    <form className="flex flex-col bg-white rounded shadow-lg p-12 mt-12">
        {
          response && (
            <p className="text-red-500 font-semibold text-xs mb-6">{response}</p>
          )
        }
      <label className="font-semibold text-xs" >Input the 8 digit code</label>
      <input 
      name='code'
      value={code}
      onChange={handleChange}
      id='code'
      className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" 
      type="text"
      />
      {errors && (
          <p className="text-red-500 flex font-semibold text-xs">{errors}</p>
      )}
      <button 
      className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
      onClick={(e) => {
        setRes('Loading...')
        handleSubmit(e)
      }}
      type='submit'
      >Proceed</button>
      <div className="flex mt-6 justify-center text-xs">
        <button type='submit' onClick={e=> {
          setRes('Loading...')
          resendCode(e, id)
          }} className="text-blue-400 hover:text-blue-500 cursor-pointer">Resend Code</button>
      </div>
    </form>
  
  </div>
  )
}

export default VerifyCode