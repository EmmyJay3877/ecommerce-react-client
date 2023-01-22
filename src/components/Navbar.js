import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  return (
<div className="bg-blue-500">
	<nav className="sm:flex sm:justify-between md:flex-row md:justify-between relative px-4 py-4 lg:flex lg:justify-between lg:items-center bg-white ">
    <Link to={'/'}>
		<h1 className="lg:text-3xl lg:font-bold lg:leading-none md:text-2xl md:font-semibold sm:text-2xl sm:font-semibold">
		Dynamic Headphones
		</h1>
    </Link>
    <div>
    <Link to={'/signup'} 
    className="lg:inline-block lg:ml-auto lg:mr-3 lg:py-3 lg:px-6 lg:bg-gray-50 lg:hover:bg-gray-100 lg:text-sm lg:text-gray-900 lg:font-bold lg:rounded-xl lg:transition lg:duration-200 
    md:inline-block md:ml-auto md:mr-1 md:py-2 md:px-4 md:bg-gray-50 md:hover:bg-gray-100 md:text-xs md:text-gray-900 md:font-semibold md:rounded-xl md:transition md:duration-200 
    sm:inline-block sm:ml-auto sm:mr-1 sm:py-1 sm:px-4 sm:bg-gray-50 sm:hover:bg-gray-300 sm:text-xs sm:text-gray-900 sm:font-semibold sm:rounded-xl sm:transition sm:duration-200">
		<button 
    >Sign Up
    </button>
    </Link>
    <Link to={'/login'}>
		<button 
    className="lg:inline-block lg:py-3 lg:px-6 lg:bg-blue-500 lg:hover:bg-blue-600 lg:text-sm lg:text-white lg:font-bold lg:rounded-xl lg:transition lg:duration-200 
    md:inline-block md:py-2 md:px-4 md:bg-blue-500 md:hover:bg-blue-600 md:text-sm md:text-white md:font-semibold md:rounded-xl md:transition md:duration-200 
    sm:inline-block sm:py-2 sm:px-4 sm:bg-blue-500 sm:hover:bg-blue-600 sm:text-sm sm:text-white sm:font-semibold sm:rounded-xl sm:transition sm:duration-200 "
    >Log In
    </button>
    </Link>
    </div>
	</nav>
</div>
  )
}

export default Navbar