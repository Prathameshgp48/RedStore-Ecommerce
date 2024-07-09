import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ImageComponent from "../../ImageComponent.js";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext.js";
import { toast } from 'react-toastify'


export default function Login() {
  axios.defaults.withCredentials = true
  const navigate = useNavigate()
  const { setlogin } = useAuth()
  const [login, setLogin] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLogin({
      ...login,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(login)

    try {
      const response = await axios.post("http://localhost:8000/api/v1/users/login", login)
      console.log(response.data.message)
      console.log(response.data)
      console.log(response)
      setLogin({
        email: "",
        password: ""
      })
      toast.success(response.data.message)
      //authcontext function
      setlogin()
      navigate('/products')

    } catch (error) {
      console.log('Invalid Credentials')
      toast.error("Invalid Credentials")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-white to-red-300">
      <div className="flex flex-col md:flex-row items-center md:justify-between w-full max-w-6xl p-8 md:p-16">
        <div className="md:w-1/2 md:order-2 mb-8 md:mb-0 flex justify-center">
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
              className="mb-5 w-full p-2 rounded-md border border-gray-300 bg-white bg-opacity-50 outline-none"
            />
            <input
              type="password"
              name="password"
              value={login.password}
              onChange={handleChange}
              placeholder="Password"
              className="mb-5 w-full p-2 rounded-md border border-gray-300 bg-white bg-opacity-50 outline-none"
            />
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
