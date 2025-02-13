import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


const ProtectedRoute = () => {

    const token = localStorage.getItem('token')

  return (
    <div>
        {token ? <Outlet /> : <Navigate to={'/login'}/> }
    </div>
  )
}

export default ProtectedRoute