import React from 'react'
import { Link } from 'react-router-dom'
import { BsBagCheckFill } from 'react-icons/bs';
import { useStateContext } from '../StateContext';
import { useEffect } from 'react';
import { io } from 'socket.io-client'

const socket = io(`${process.env.REACT_APP_SOCKET_SERVER}`, {path: '/ws/socket.io', autoConnect: false});

const Success = () => {

  const { verifyPayment } = useStateContext()

  useEffect(()=>{
    verifyPayment()
  }, [])

  useEffect(()=>{

    socket.connect();

    socket.emit('send_notification')

    return () => {
          socket.disconnect();
        }
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