import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Registration = () => {

  const [username,setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email,setEmail] = useState('');
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Add this line
    const payload = {
      name:username,
      email:email,
      password:password 
    }
    axios.post('http://localhost:8000/users/register',payload)
    .then((res)=>{
      setLoading(false)
      toast.success('Registration successful')
      console.log('User registered',res);
      navigate('/login')
      
    })
    .catch((err)=>{
      setLoading(false)
      toast.error('Registration failed')
      console.log('Registration failed',err);

    })
  };

  return (
    <div className='border flex flex-col justify-center items-center h-screen'>
      <h1 className='text-2xl m-2'>REGISTRATION</h1>
      <div className='border max-w-xl md:w-[500px] m-5 p-5'>
        <form onSubmit={handleSubmit} >
          <div className='flex flex-col justify-center items-stretch gap-4 w-full p-5' >
            <div className='mb-5'>
              <label className='block'>Username</label>
              <input className='border w-full p-1 border-blue-500' type="text" placeholder='Enter username...' value={username} onChange={(e)=>{setUsername(e.target.value)}} required/>
            </div>
            <div className='mb-5'>
              <label className='block'>Email</label>
              <input className='border w-full p-1 border-blue-500' type="email" placeholder='Enter Email...' value={email}  onChange={(e)=>{setEmail(e.target.value)}} required/>
            </div>
            <div className='mb-5'>
              <label className='block'>Password</label>
              <input className='border w-full p-1 border-blue-500' type="password" placeholder='Enter password...' value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
            </div>
            <button className='cursor-pointer  p-2 rounded-2xl w-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-150' type='submit' disabled={loading} >
              {loading ? 'Submitting...' :'Register'}
            </button>
          </div>
        </form>
      </div>
      

    </div>
    
  )
}

export default Registration