import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useStateContext } from '../../StateContext'

const Proceed = () => {

    const {errorMsg} = useStateContext()

    const [status, setStatus] = useState()

    const [searchparams] = useSearchParams()
    const token_data = searchparams.get('token')

    const verifyEmail = async () => {
        try{
            const res = await fetch('https://ecommerce-fastapi-server.onrender.com/customers/verify_email/', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token_data}`
                }
            })
            const statusCode = await res.status
            setStatus(statusCode)
        } catch (error) {
            alert(errorMsg)
        }
    }

    useEffect(()=>{
        verifyEmail()
    }, [])

  return (
    <div>
        {
            status === 200 ? 
            <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
            <div className="max-w-xl px-5 text-center">
            <h3 className="mb-2 text-[42px] font-bold text-zinc-800">Your email has been verified</h3>
            <p className="mb-2 text-lg text-zinc-500">Click on the button below to proceed</p>
            <div className="inline-flex items-end">
            <Link to={`/completesignup/?token=${token_data}`}>
                        <button 
                        type='submit' 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >Proceed</button>
            </Link>
            </div>
            </div>
            </div>
            :
        <div className="h1"> An Error has occured</div>
        }
    </div>
  )
}

export default Proceed