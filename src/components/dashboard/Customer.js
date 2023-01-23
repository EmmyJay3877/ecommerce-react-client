import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import SessionExpiredModal from '../SessionExpireedModal'
import { useStateContext } from '../../StateContext'
import LoadingModal from '../LoadingModal'

const Customer = () => {

  const {checkInterVal, interValId, setShowLoading} = useStateContext()

  useEffect(()=>{
      checkInterVal()
      return ()=> clearInterval(interValId)
  }, [])

  useEffect(()=>{
    setShowLoading(true)
  }, [])

  return (
    <div>
      <SessionExpiredModal/>
      <LoadingModal/>
      {<Outlet/>}
    </div>
  )
}

export default Customer