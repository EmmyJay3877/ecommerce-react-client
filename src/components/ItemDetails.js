import React from 'react'
import '../index.css'
import { Link, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { AiOutlinePlus, AiOutlineMinus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import Item from './Item'
import { useStateContext } from '../StateContext'
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './Navbar'
import Footer from './Footer'
import DashboardNavBar from './dashboard/DashboardNavBar'

const ItemDetails = () => {

  const { qty, onAdd, loggedIn, incQty, decQty, updateTotalPriceAndQuantity, response, setRes, errorMsg, setShowCart, setQty } = useStateContext();

  
  const [ itemDetails, setItemDetails] = useState([])
  
  const [itemCards, setItemCards] = useState([])
  
  const [searchparams] = useSearchParams()
  let id = searchparams.get('id')

  useEffect(()=>{
    setRes()
    setQty(1)
  }, [id])

  useEffect(()=>{
    const getItemDetails = async () => {
      try {
        const res = await fetch(`https://ecommerce-fastapi-server.onrender.com/items/${id}`)
        const data = await res.json()
        const statusCode = await res.status
        if (statusCode === 200) setItemDetails(data);
      } catch (error) {
        alert(errorMsg)
      }
    }
    getItemDetails()
  }, [id])

  const {name, image, description, price} = itemDetails

  useEffect(()=>{
    const getItems = async () => {
      try{
        const res = await fetch("https://ecommerce-fastapi-server.onrender.com/items/")
        const data = await res.json()
        const statusCode = await res.status;
        if (statusCode === 200) setItemCards(data);
      } catch (error){
        alert(errorMsg)
      }
    }
    getItems()
  }, [])

  return (
    <div>
      <div>
      {
        loggedIn === false ? <Navbar /> : <DashboardNavBar />
      }
      </div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={image} className="product-detail-image"/>
          </div>
         
        </div>

        <div className="product-detail-desc">
          <h1 className='font-bold text-xl'>{name}</h1>
          <div className="reviews">
            <div className='flex'>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p className='text-sm'>
              (20)
            </p>
          </div>
          <h4 className='font-bold'>Details: </h4>
          <p className='text-sm'>{description}</p>
          <p className="price">${price}</p>
          { loggedIn === true && <div className="quantity">
            <h3 className='font-bold'>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num text-xs">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>}
          {
            loggedIn === false 
            ? 
            <Link to={"/login"}>
            <div className="buttons">
              <button type="button" className="buy-now">Login to add to cart</button>
            </div>
            </Link>
             :
            <div className="div">
              {
                response && (
                  <p className="text-red-500 text-sm font-semibold mt-5">{response}</p>
                )
              }
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => {
              setRes('Loading...')
              onAdd(itemDetails.id, qty)
              updateTotalPriceAndQuantity()
              }}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={()=>setShowCart(true)}>Buy Now</button>
          </div>
             </div>
          }
        </div>
      </div>
      <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {itemCards.map((itemCard) => (
                <Item key={itemCard.id} itemCard={itemCard} />
              ))}
            </div>
          </div>
          <Footer />
      </div>
      <ToastContainer />
    </div>
  )
}

export default ItemDetails