import React from 'react'
import { useEffect } from 'react'

const EmailMsg = () => {

    useEffect(()=>{
        sessionStorage.removeItem('token')
    },[])

    useEffect(()=>{
      setTimeout(() => {
        window.location.href = `${process.env.REACT_APP_HOST}/signup/`;
      }, 15000);
    }, [])

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
    <div className="max-w-xl px-5 text-center">
    <h2 className="mb-2 text-[30px] font-bold text-zinc-800">Check your inbox or spam</h2>
    <p className="mb-2 text-lg text-zinc-500">We are glad that you’re with us ? We’ve sent you a verification link to your email address</p>
    <p className='text-zinc-500'>if you didn't get the verification link. Please re-register, thanks.</p>
  </div>
</div>
  )
}

export default EmailMsg