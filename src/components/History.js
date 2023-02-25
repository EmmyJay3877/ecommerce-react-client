import React from 'react'
import { useEffect } from 'react'
import { useStateContext } from '../StateContext'
import DashboardNavBar from './dashboard/DashboardNavBar'

const History = () => {

  const { getHistory, history}  = useStateContext()

  useEffect(()=>{
    getHistory()

  }, [])

  return (
    <div>
        <div>
            <DashboardNavBar />
        </div>
    <div className='m-10 w-auto h-screen bg-white flex justify-center items-center'>
        <div className=' w-9/12 h-5/6'>
        <div className='text-xl font-bold'>History</div>
        <div className=' border-t'>
            <h1 className=' mt-2'>{!history&& 'You have no history'}</h1>
            {
              history?.map(cuHistory=>(
                <div className='flex justify-between hover:bg-slate-50 border-b p-2'>
                  <div>{cuHistory.cu_history}</div>
                  <div>{cuHistory.created_at}</div>
                </div>
              ))
            }
        </div>
        </div>
    </div>
    </div>
  )
}

export default History