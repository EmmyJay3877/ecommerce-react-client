import React, { useState } from 'react'
import "./dashboard.css"
import Cart from "../Cart"
import { useStateContext } from '../../StateContext'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { CgProfile } from 'react-icons/cg'

const DashboardNavBar = () => {

      const [isDropdownOpen, setIsDropdownOpen] = useState(false);

      const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
      };

    const { showCart, setShowCart, totalQuantities, setLoggedin, updateCart, updateTotalPriceAndQuantity, customer} = useStateContext();

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
      <Link to={"/customer"}>
      <h1 className="navbar-title">Dynamic Headphones</h1>
      </Link>
      <nav className="navbar-menu">        
        <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <svg 
        className="h-8 p-0 text-red-700 hover:text-green-500 duration-200 svg-inline--fa fa-shopping-cart fa-w-18 fa-7x" 
        aria-hidden="true" focusable="false" data-prefix="far" data-icon="shopping-cart" role="img" 
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" 
        d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z"
        ></path></svg>
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      <div className="relative inline-block text-left mx-4">
      <div className='flex justify-center items-center'>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-1 py-1 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={toggleDropdown}
        >
          <CgProfile size={40}/>
          <svg
            className="-mr-1 h-6 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isDropdownOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a href="#" className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform hover:bg-gray-100">
            <img className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9" src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1677076263~exp=1677076863~hmac=17801533b3156b4893eeefc6f67d0eb87d95049649f608ab2a75ff503b136c96" alt="user avatar"/>
            <div className="mx-1">
                <h1 className="text-sm font-semibold text-gray-700">{customer.username}</h1>
                <p className="text-sm text-gray-500">{customer.email}</p>
            </div>
        </a>
        <hr className="border-gray-200 dark:border-gray-700 "/>
          <div className="py-1" role="none">
           <Link to={'/customer/profile'}>
            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem">
              Update Profile
            </button>
           </Link>
           <Link to={'/customer/history'}>
            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem">
              View History
            </button>
           </Link>
            <hr
          className="my-2 h-0 border border-t-0 border-solid border-neutral-700 opacity-25 dark:border-neutral-200" />
            <Link to={'/'}>
            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem" onClick={removeToken}>
              Sign Out
            </button>
            </Link>
          </div>
        </div>
      )}
    </div>
    
      </nav>
      {showCart && <Cart />}
    </nav>
  )
}

export default DashboardNavBar