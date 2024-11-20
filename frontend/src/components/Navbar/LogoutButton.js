import React from 'react'
import { useAuth } from '../../contexts/AuthContext.js'
import axios from 'axios'

function LogoutButton() {
    axios.defaults.withCredentials = true
    const { setlogout } = useAuth()

    const handlelogin = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/v1/users/logout")
            console.log(response.data)
            setlogout()
        } catch (error) {
            console.log("Error:", error)
            setlogout()
        }
    }

    return (
        <button onClick={handlelogin} className="text-black text-base no-underline block md:border-none py-2 px-4 md:hover:bg-transparent hover:bg-red-100 border-b border-gray-300">
            <li className="list-none">Logout</li>
        </button>
    )
}

export default LogoutButton
