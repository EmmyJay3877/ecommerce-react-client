import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import SessionExpiredModal from '../SessionExpireedModal'
import { useStateContext } from '../../StateContext'

const Customer = () => {

  const {checkInterVal, interValId} = useStateContext()

  useEffect(()=>{
      checkInterVal()
      return ()=> clearInterval(interValId)
  }, [])

  return (
    <div>
      <SessionExpiredModal/>
      {<Outlet/>}
    </div>
  )
}

export default Customer