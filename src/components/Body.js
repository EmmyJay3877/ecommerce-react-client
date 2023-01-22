import React from 'react'
import Banner from './Banner'
import '../index.css'
import Item from './Item'
import { useState, useEffect } from 'react'
import FooterBanner from './FooterBanner'
import { useStateContext } from '../StateContext'



const Body = () => {

  const {setShowLoading} = useStateContext()
  
    const [itemCards, setItemCards] = useState([])

    useEffect(()=>{
      const getItems = async () => {
        const res = await fetch("https://ecommerce-fastapi-server.onrender.com/items/")
        const data = await res.json()
        const items = data.slice(0, 5);
        setItemCards(items);
        setShowLoading(false)
      }

      getItems()

      .catch(console.error)
    }, [])

  return (
    <div>
        <Banner />
        <div className="products-heading">
        <h2>Best Selling Products</h2>
        </div>
        
        <div className="products-container">
            {itemCards?.map(itemCard=> <Item itemCard={itemCard} key={itemCard.id} />)}
        </div>

      <FooterBanner/>
    </div>
  )
}

export default Body