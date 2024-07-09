import React from 'react'
import { NavLink } from 'react-router-dom'

function LoginButton() {
    return (
        <NavLink to="/login" className="text-black text-base no-underline">
            <li className="list-none mr-10">Login</li>
        </NavLink>
    )
}

export default LoginButton
