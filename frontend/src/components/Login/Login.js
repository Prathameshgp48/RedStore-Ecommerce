import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ImageComponent from "../../ImageComponent.js";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext.js";
import { toast } from 'react-toastify'
import ServerUrl from "../../constant.js";


export default function Login() {
  axios.defaults.withCredentials = true
  const navigate = useNavigate()
  const { setlogin } = useAuth()
  const [login, setLogin] = useState({
    email: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLogin({
      ...login,
      [name]: value
    })
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(login)

    try {
      // const response = await axios.post(`http://localhost:8000/api/v1/users/login`, login)
      const response = await axios.post(`https://redstore-ecommerce-nlqa.onrender.com/api/v1/users/login`, login)
      console.log(response.data)
      setLogin({
        email: "",
        password: ""
      })
      setlogin()
      toast.success(response.data.message)
      //authcontext function
      navigate('/products')

    } catch (error) {
      console.log(error)
      toast.error("Invalid Credentials")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-white to-red-400">
      <div className="flex flex-col md:flex-row items-center md:justify-between w-full max-w-6xl p-8 md:p-16">
        <div className="hidden md:flex md:w-1/2 md:order-2 mb-8 md:mb-0 justify-center">
          <ImageComponent imagePath="/images/image1.png" altText="Login Image" />
        </div>
        <div className="md:w-1/2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Welcome Back!
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-6">
            Please login to continue.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col items-center md:items-start w-full max-w-xs bg-white bg-opacity-20 p-8 rounded-2xl shadow-lg backdrop-blur-md border border-white border-opacity-30">
            <input
              type="email"
              name="email"
              value={login.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="mb-5 w-full p-2 rounded-md border border-gray-300 bg-white bg-opacity-50 outline-none placeholder-gray-600"
            />
            <div className="relative w-full mb-5">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={login.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-2 rounded-md border border-gray-300 bg-white bg-opacity-50 outline-none placeholder-gray-600"
              />
              <button type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? (
                  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-500">
                    <path d="M2 2L22 22" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                ) : (
                  <svg width="24px" height="px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-500">
                    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <circle cx="12" cy="12" r="3" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                )}
              </button>
            </div>
            <button
              type="submit"
              className="bg-red-500 text-white py-2 px-6 rounded-full transition duration-300 hover:bg-red-600 w-full mb-4"
            >
              Login
            </button>
            <p className="text-lg">
              Don't have an account?
              <NavLink to="/register" className="text-blue-600 hover:underline">
                Register
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
