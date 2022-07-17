import React from "react"
import { FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa"
import { Link } from "react-router-dom"

const Header = () => {
    return (
        <div>
            <div className="header">
                <div className="logo">
                    <Link to="/">GoalSetter</Link>
                </div>
                <ul>
                    <li>
                        <Link to="/login">
                            <FaSignInAlt />
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link to="/register">
                            <FaUser />
                            Register
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header
