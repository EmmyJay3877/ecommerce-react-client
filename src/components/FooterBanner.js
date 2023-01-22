import React from 'react'
import '../index.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const FooterBanner = () => {

  const [footerBanner, setFooterBanner] = useState([])

  const getItem = ()=>{
    fetch('https://ecommerce-fastapi-server.onrender.com/items/')
    .then(res=>res.json())
    .then(data=>setFooterBanner(data[3]))
}

useEffect(()=>{
    getItem()
    
}, [])

  const { name, description, id, image} = footerBanner

  return (
    <div className='footer-banner-container'>
        <div className='banner-desc'>
        <div className='left'>
        <h3>MUSIC IS</h3>
        <h3>LIFE</h3>
        </div>
        <div className='right'>
        <p>{name}</p>
        <h3>Summer Sale</h3>
        <p>{description}</p>
        <Link to={`/itemdetails/?id=${id}`}>
        <button type='button'>
        Shop Now
        </button>
        </Link>
        </div>
        <img src={image} className='footer-banner-image' />
        </div>
    </div>
  )
}

export default FooterBanner