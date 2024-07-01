import React from "react";
import { NavLink } from "react-router-dom";
import ImageComponent from "../../ImageComponent.js";

export default function Login() {
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
          <div className="flex flex-col items-center md:items-start w-full max-w-xs bg-white bg-opacity-20 p-8 rounded-2xl shadow-lg backdrop-blur-md border border-white border-opacity-30">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="mb-5 w-full p-2 rounded-md border border-gray-300 bg-white bg-opacity-50 outline-none"
            />
            <input
              type="password"
              name="password"
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
              Don't have an account?{" "}
              <NavLink to="/register" className="text-blue-600 hover:underline">
                Register
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
