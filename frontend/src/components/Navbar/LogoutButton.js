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
        <button onClick={handlelogin} className="text-black text-base no-underline">
            <li className="list-none mr-10">Logout</li>
        </button>
    )
}

export default LogoutButton
