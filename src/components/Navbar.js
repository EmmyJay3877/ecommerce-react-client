import React from 'react'
import { Link } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'

const Navbar = () => {

  return (
<div className="">
	<nav className="sm:flex sm:justify-between md:flex-row md:justify-between relative px-4 py-4 lg:flex lg:justify-between lg:items-center bg-white ">
    <Link to={'/'}>
		<h1 className="lg:text-3xl lg:font-bold lg:leading-none md:text-2xl md:font-semibold sm:text-2xl sm:font-semibold">
		Dynamic Headphones
		</h1>
    </Link>
    <div>
    <Link to={'/signup'} 
    className="lg:inline-block lg:ml-auto lg:mr-3 lg:py-3 lg:px-6 lg:bg-gray-200 lg:hover:bg-gray-300 lg:text-sm lg:text-gray-900 lg:font-bold lg:rounded-xl lg:transition lg:duration-200 
    md:inline-block md:ml-auto md:mr-1 md:py-2 md:px-4 md:bg-gray-200 md:hover:bg-gray-300 md:text-xs md:text-gray-900 md:font-semibold md:rounded-xl md:transition md:duration-200 hidden">
		<button 
    >Sign Up
    </button>
    </Link>
    <Link to={'/login'}>
		<button 
    className="inline-block py-3 lg:px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200 
    md:inline-block md:py-2 md:px-4 md:bg-blue-500 md:hover:bg-blue-600 md:text-sm md:text-white md:font-semibold md:rounded-xl md:transition md:duration-200 hidden"
    >Log In
    </button>
    </Link>
    <div className='lg:hidden md:hidden'><FiMenu size={40}/></div>
    </div>
	</nav>
</div>
  )
}

export default Navbar