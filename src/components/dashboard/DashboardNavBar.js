import React from 'react'
import "./dashboard.css"
import Cart from "../Cart"
import { useStateContext } from '../../StateContext'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { CgProfile } from 'react-icons/cg'

const DashboardNavBar = () => {

    const { showCart, setShowCart, totalQuantities, setLoggedin, updateCart, updateTotalPriceAndQuantity} = useStateContext();

    const toggleMenuOpen = () => document.body.classList.toggle("open");

    const removeToken = ()=>{
      sessionStorage.removeItem('token')
      setLoggedin(false)
    }

    useEffect(()=>{
      updateCart()
      updateTotalPriceAndQuantity()
    }, [])

    useEffect(()=>{
      updateCart()
  }, [showCart])

  return (
    <nav className="navbar">
      <div className="navbar-overlay" onClick={toggleMenuOpen}></div>

      <button type="button" className="navbar-burger" onClick={()=> {
        toggleMenuOpen()
        }}>
        <span className="material-icon"><GiHamburgerMenu size={30}/></span>
      </button>
      <Link to={"/customer"}>
      <h1 className="navbar-title">Dynamic Headphones</h1>
      </Link>
      <nav className="navbar-menu">
        <Link to={'/'}>
        <button type="button" className='active' onClick={removeToken}>Logout</button>
        </Link>
        <Link to={'/customer/profile'}>
        <button type="button" className="active"><CgProfile size={30}/></button>
        </Link>
        <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <svg 
        className="h-8 p-0 text-red-700 hover:text-green-500 duration-200 svg-inline--fa fa-shopping-cart fa-w-18 fa-7x" 
        aria-hidden="true" focusable="false" data-prefix="far" data-icon="shopping-cart" role="img" 
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" 
        d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z"
        ></path></svg>
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
      </nav>
      {showCart && <Cart />}
    </nav>
  )
}

export default DashboardNavBar