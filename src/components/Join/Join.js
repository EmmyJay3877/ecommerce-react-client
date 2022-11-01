import React, { useState } from 'react'
import './Join.css'
import { Link } from "react-router-dom";

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  return (

    <div className='join-card'>
      <h2 className=''>Chat App</h2>
      <h3>Choose a username and enter your preferred room. Enjoy!!!</h3>
      <div className='join-form'>
        <input 
              type="text"
              placeholder='Username'
              onChange={(event) => setName(event.target.value)}
         />
        <input 
              type="text"
              placeholder='Room'
              onChange={(event) => setRoom(event.target.value)}
         />
         <Link className='button' to={`/chat?name=${name}&room=${room}`}>
              <button 
                className='font-semibold text-white bg-blue-700 border-0 m-3 w-full h-14 rounded-lg' 
                type='submit'
                onClick={e => (!name || !room) ? e.preventDefault() : null}
                >Join Chat</button>
         </Link>
      </div>
    </div>
  )
}

export default Join