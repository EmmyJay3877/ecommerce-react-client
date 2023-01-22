import React from 'react'
import { useStateContext } from '../StateContext'
import '../index.css'

const LoadingModal = () => {
    const { showLoading } = useStateContext()
  return (
    <div>{
        showLoading===true && <div className="loading-modal">
        <div className="loading-modal-content">
          <div className="loading-modal-icon"></div>
        </div>
      </div>      
        }</div>
  )
}

export default LoadingModal