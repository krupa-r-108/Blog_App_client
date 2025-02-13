import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Profile = () => {

  const [loading,setLoading] = useState(false)
  const [data,setData] = useState('')

  const token = JSON.parse(localStorage.getItem('token'))
  // const token = (localStorage.getItem('token'))

  const fetchData = () => {

    const header = {
      headers:{
        authorization:`Bearer ${token}`
      }
    }

    setLoading(true)
    axios.post('http://localhost:8000/users/profile',{},header)
    .then((res)=>{
      setLoading(false)
      setData(res.data.data)
      // console.log('Profile data',res);
      
    })
    .catch((err)=>{
      setLoading(false)
      console.log('Profile error',err);

    })
  }

  // console.log('Data',data)
  useEffect(()=>{
    fetchData()
  },[])

  return (
    <div>
      {loading && <p>Loading...</p>}
      <div>
        <div>
          <h2>Name: {data.name}</h2>
          <p>Email: {data.email}</p>
          <p>Id: {data.id}</p>
        </div>
      </div>
    </div>
  )
}

export default Profile