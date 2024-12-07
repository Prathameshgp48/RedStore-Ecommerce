import React, { useState } from 'react'
import { toast } from 'react-toastify'
import OtpForm from './OtpForm'

function LoginForm() {
  const [userinput, setUserinput] = useState("")
  const [showOtp, setShowOtp] = useState(false)

  const handleInput = (e) => {
    setUserinput(e.target.value)
  }

  const handleInputSubmit = (e) => {
    e.preventDefault()

    //input validation
    const phonenumRegex = /[^0-9]/g
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if ((userinput.length > 10 && phonenumRegex.test(userinput)) || emailRegex.test(userinput)) {
      toast.error("Invalid Phone number or email")
      return
    }

    setShowOtp(true)
  }

  const onOTPSubmit = (e) => {
    if(e && e.preventDefault) e.preventDefault()

    console.log(e && e.target? e.target.value : e)
    // setShowOtp(false)
  }

  return (
    <div className = "fixed inset-0 bg-white bg-opacity-30 backdrop-blur-sm flex flex-col items-center justify-center">
      {!showOtp ?
        <form onSubmit={handleInputSubmit} className="flex flex-col space-y-4 bg-red-500 p-12 rounded-md">
          <p className="text-white font-poppins font-semibold">Enter Your Phone Number Or Email</p>
          <input
            type="text"
            value={userinput}
            onChange={handleInput}
            className="py-3 rounded-md placeholder:italic placeholder:text-gray-500 placeholder:pl-1 text-center"
            placeholder="Enter Your Phone Number Or Email" />
        </form>
        :
        <div className="flex flex-col space-y-4 bg-red-500 p-12 rounded-md">
          <p className="text-gray-700 font-poppins font-semibold">Enter OTP sent to <span className="text-white font-extrabold">{userinput}</span></p>
          <OtpForm length={4} onOTPSubmit = {onOTPSubmit} />
        </div>
      }
    </div>
  )
}

export default LoginForm
