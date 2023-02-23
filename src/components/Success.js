import React from 'react'
import { Link } from 'react-router-dom'
import { BsBagCheckFill } from 'react-icons/bs';
import { useStateContext } from '../StateContext';
import { useEffect } from 'react';

const Success = () => {

  const { verifyPayment } = useStateContext()

  useEffect(()=>{
    verifyPayment()
  }, [])

  return (
    <div className="success-wrapper">
    <div className="success">
      <p className="icon">
        <BsBagCheckFill />
      </p>
      <h2>Thank you for your order!</h2>
      <p className="email-msg">Check your email inbox for the receipt.</p>
      <p className="description">
        If you have any questions, please email
        <a className="email" href="mailto:order@example.com">
          order@example.com
        </a>
      </p>
      <Link to={'/customer/'}>
        <button type="button" width="300px" className="btn">
          Continue Shopping
        </button>
      </Link>
    </div>
  </div>
  )
}

export default Success