import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { AiOutlineBell } from 'react-icons/ai';
import './Header.css';

const Header = ({ onLogout }) => {
    const [userRole, setUserRole] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve roles from localStorage dynamically
        const roles = JSON.parse(localStorage.getItem("roles"));
        if (roles && roles.length > 0) {
            setUserRole(roles[0]); // Assuming the first role is the primary one
        }
    }, []);

    return (
        <header className="header">
            <div className="header-container">
                {/* Left: Logo */}
                <div className="header-logo">
                    <Link to="/" className="logo">
                        <img
                            src="/logo.png"
                            alt="Logo"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.style.display = 'none';
                            }}
                        />
                        <span className="default-logo">LOGO</span>
                    </Link>
                </div>

                {/* Center: Search Bar */}
                <div className="header-search">
                    <div className="search-wrapper">
                        <CiSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="search-input"
                        />
                    </div>
                </div>

                {/* Right: Notifications and Profile */}
                <div className="header-right">
                    <div className="notification">
                        <AiOutlineBell className="notification-bell" />
                    </div>
                    <div className="profile">
					<img
                                src="/profile.jpg"
                                alt="Profile"
                                className="profile-img"
                            />
                        <div className="profile-info">
                            <span className="profile-text">
                                Login As: {userRole || "User"}
                            </span>
                            <button
                                className="btn-logout"
                                onClick={() => {
                                    onLogout();
                                    navigate('/');
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
