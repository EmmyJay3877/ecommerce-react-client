import React from 'react'
import '../index.css'
import Body from './Body'
import Footer from './Footer'
import Navbar from './Navbar'

const HomePage = () => {
  return (
    <div>
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