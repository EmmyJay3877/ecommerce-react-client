import React from 'react'
import DashboardNavBar from './DashboardNavBar';
import "./dashboard.css"
import Footer from '../Footer';
import Item from '../Item';
import { useState, useEffect } from 'react';
import { useStateContext } from '../../StateContext';


const Dashboard = () => {

  const { setLoggedin, customer, fetchCustomer, errorMsg } = useStateContext()

  const [itemCards, setItemCards] = useState([])
  
  useEffect(()=>{
    const getItems = async () => {
      try {
        const res = await fetch("https://ecommerce-fastapi-server.onrender.com/items/")
        const data = await res.json()
        const statusCode = await res.status
        if (statusCode===200){
          setItemCards(data);
          setLoggedin(true)
          fetchCustomer()
        }
      }catch(error){
        alert(errorMsg)
      }
    }
    getItems()
  }, [])

  return (
    <div>
      <header>
        <DashboardNavBar/>
      </header>
      <div className="products-heading">
        <h2>Welcome {customer.username}</h2>
        <p>Take a look at what we've got for you</p>
      </div>

      <div className="products-container">
            {itemCards?.map(itemCard=> <Item itemCard={itemCard} key={itemCard.id} />)}
        </div>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Dashboard