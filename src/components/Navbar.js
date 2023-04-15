import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'

const Navbar = () => {

  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
<div className="">
	<nav className="flex justify-between items-center md:flex-row md:justify-between relative px-4 py-4 lg:flex lg:justify-between lg:items-center bg-white">
    <Link to={'/'}>
		<h1 className="lg:text-3xl lg:font-bold lg:leading-none md:text-2xl md:font-semibold text-2xl font-semibold">
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
    </div>
    <div className='lg:hidden md:hidden mx-4'>
    <div className=' cursor-pointer' onClick={toggleMenu}><FiMenu size={40}/></div>
    {showMenu && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <hr className="border-gray-200 dark:border-gray-700 "/>
          <div className="py-1" role="none">
           <Link to={'/login'}>
            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem">
              Login
            </button>
           </Link>
           <Link to={'/signup'}>
            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem">
              SignUp
            </button>
           </Link>
          </div>
        </div>
      )}
    </div>
	</nav>
</div>
  )
}

export default Navbar