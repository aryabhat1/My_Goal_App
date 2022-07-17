import React from "react"
import { FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { reset, logout } from "../features/auth/authSlice"

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate("/")
    }

    return (
        <div>
            <div className="header">
                <div className="logo">
                    <Link to="/">GoalSetter</Link>
                </div>
                <ul>
                    {user ? (
                        <li>
                            <button className="btn" onClick={onLogout}>
                                <FaSignOutAlt />
                                Logout
                            </button>
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link to="/login">
                                    <FaSignInAlt />
                                    Login
                                </Link>
                            </li>
                        </>
                    )}
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
