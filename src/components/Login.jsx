import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
import {GoogleLogin} from '@react-oauth/google'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword,setShowPassword] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Add this line

    const payload = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:8000/users/login", payload)
      .then((res) => {
        setLoading(false);
        toast.success("Login successful");
        // console.log("User Logged in", res);
        localStorage.setItem('token',JSON.stringify(res.data.token));
        navigate('/profile')
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Login failed");
        console.log("Login failed", err);
      });
  };

const handleGoogleLogin = async (response) => {
  try {
    const {credential} = response; //Get google id
    const res = await axios.post('http://localhost:8000/users/google-login',{
      token:credential
    })
    // console.log(res)
    localStorage.setItem('token',JSON.stringify(res.data.token));
    toast.success('Google Login successful')
    navigate('/profile')
  } catch (error) {
    toast.error('Google Login Failed')
  }
}


  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="m-2 text-2xl">LOGIN</h1>
      <div className="md:w-[500px] max-w-xl border m-5 p-5">
        <form onSubmit={handleSubmit} className="p-5">
          <div className="flex flex-col justify-between items-stretch w-full ">
            <div className="mb-5" >
              <label className="mb-2 block">Email</label>
              <input
                className="border border-blue-500 w-full p-1 focus:outline-none focus:ring-2 focus:ring-blue-600 "
                type="email"
                placeholder="Enter Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-5">
              <label className="mb-2 block">Password</label>
              <div className="relative">
                <input
                  className="border border-blue-500 p-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="button" onClick={()=>setShowPassword(!showPassword)} className="text-2xl absolute right-3 cursor-pointer">
                  {showPassword ? '🐵' : '🙈'}
                </button>
              </div>
              
            </div>
            <button
              disabled={loading}
              type="submit"
              className="border p-2 rounded-2xl cursor-pointer w-full bg-blue-500 text-white mt-1 hover:bg-blue-600 transition duration-100"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
          <GoogleLogin onSuccess={handleGoogleLogin} onError={() => toast.error('Google Login Failed')}/>
        </form>
      </div>
    </div>
  );
};

export default Login;
