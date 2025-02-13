import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'



const Header = () => {

  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleLogout = () =>{
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    <div className='border border-b border-gray-500 h-12 flex gap-10 items-center justify-center '>
        <Link to={'/'} className='hover:font-bold'>Home</Link>
        {
          token ? (
            <>
                 <Link to={'/profile'} className='hover:font-bold'>Profile</Link>
                 <button className='cursor-pointer hover:font-bold' onClick={handleLogout}>Logout</button>
            </>
           
          ):(
            <>
              <Link to={'/login'} className='hover:font-bold'>Login</Link>
              <Link to={'/registration'} className='hover:font-bold'>Registration</Link>
            </>
          )
        }
    </div>
  )
}

export default Header