import React from 'react'
import { BiError } from 'react-icons/bi'

const Failed = () => {
  return (
    <div className="success-wrapper">
    <div className="success">
      <p className="icon">
        <BiError />
      </p>
      <h2>Oops, your payment failed</h2>
      <p className="email-msg">Please return to your dashboard and retry.</p>
      <p className="description">
        If you have any questions, please email
        <a className="email" href="mailto:order@example.com">
          dynamicheadphones@gmail.com
        </a>
      </p>
      <Link to={'/customer/'}>
        <button type="button" width="300px" className="btn">
          Go back to dashboard
        </button>
      </Link>
    </div>
  </div>
  )
}

export default Failed