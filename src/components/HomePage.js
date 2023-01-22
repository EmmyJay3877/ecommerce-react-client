import React from 'react'
import { useEffect } from 'react'
import '../index.css'
import { useStateContext } from '../StateContext'
import Body from './Body'
import Footer from './Footer'
import LoadingModal from './LoadingModal'
import Navbar from './Navbar'

const HomePage = () => {

  const { setShowLoading } = useStateContext()

  useEffect(()=>{
    setShowLoading(true)
  }, [])

  return (
    <div>
      <LoadingModal/>
      <header>
        <Navbar />
      </header>
      <main className='main-container'>
        <Body />
      </main>
      <footer>
      <Footer />
      </footer>
    </div>
  )
}

export default HomePage