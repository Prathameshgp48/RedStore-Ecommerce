import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ImageComponent from "../../ImageComponent.js";
import axios from "axios";
import { toast } from "react-toastify";


export default function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    fullname: "",
    phone_number: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await axios.post("http://localhost:8000/api/v1/users/register", user);
      toast.success("You Have Registered Successfully🥳")
      setUser({
        email: "",
        password: "",
        fullname: "",
        phone_number: ""
      })
    } catch (error) {
      toast.error(error.response?.data.message)
      console.log("ERROR", error.response?.data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-red-300">
      <div className="flex flex-col md:flex-row items-center md:justify-between w-full max-w-6xl p-8 md:p-16">
        <div className="md:w-1/2 md:order-2 mb-8 md:mb-0 flex justify-center">
          <ImageComponent imagePath="/images/image1.png" altText="Register Image" />
        </div>
        <div className="md:w-1/2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Join Us Today!
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-6">
            Create an account to get started.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col items-center md:items-start w-full max-w-xs bg-white bg-opacity-20 p-8 rounded-2xl shadow-lg backdrop-blur-md border border-white border-opacity-30">
            <input
              type="text"
              name="fullname"
              value={user.fullname}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="mb-5 w-full p-2 rounded-md border border-gray-300 bg-white bg-opacity-50 outline-none"
            />
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="mb-5 w-full p-2 rounded-md border border-gray-300 bg-white bg-opacity-50 outline-none"
            />
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="mb-5 w-full p-2 rounded-md border border-gray-300 bg-white bg-opacity-50 outline-none"
            />
            <input
              type="tel"
              name="phone_number"
              value={user.phone_number}
              onChange={handleChange}
              placeholder="Phone number"
              pattern="[0-9]{10}"
              required
              className="mb-5 w-full p-2 rounded-md border border-gray-300 bg-white bg-opacity-50 outline-none"
            />
            <button
              type="submit"
              className="bg-red-500 text-white py-2 px-6 rounded-full transition duration-300 hover:bg-red-600 w-full mb-4"
            >
              Register
            </button>
            <p className="text-lg">
              Already have an account?{" "}
              <NavLink to="/login" className="text-blue-600 hover:underline">
                Login
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
