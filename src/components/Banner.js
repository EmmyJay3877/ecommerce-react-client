import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../index.css'

const Banner = () => {

    const [bannerData, setBannerdate] = useState([])

    const getItem = async ()=>{
      try {
        const res = await fetch('https://ecommerce-fastapi-server.onrender.com/items/')
        const data = await res.json()
        setBannerdate(data[0]) 
      } catch (error) {
        alert('An error has occured')
      }
    }
    
    useEffect(()=>{
        getItem()
    }, [])

    const{name, id, description, image} = bannerData
  return (
    <div className="hero-banner-container">
    <div>
      <p className="beats-solo">{name}</p>
      <h3>Wireless</h3>
      <h1>HEADPHONES</h1>
      <img src={image} alt="headphones" className="hero-banner-image" />

      <div>
        <Link to={`/itemdetails/?id=${id}`}>
          <button type="button">SHOP NOW</button>
        </Link>
        <div className="desc">
          <h5>Description</h5>
          <p>{description}</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Banner