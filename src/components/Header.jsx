import React from 'react'
import { Link, useNavigate } from 'react-router-dom'



const Header = () => {

  const navigate = useNavigate()

  const handleLogout = () =>{
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    <div className='border border-b border-gray-500 h-12 flex space-x-5 items-center'>
        <Link to={'/'}>Home</Link>
        <Link to={'/login'}>Login</Link>
        <Link to={'/profile'}>Profile</Link>
        <Link to={'/registration'}>Registration</Link>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Header