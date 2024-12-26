import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { CiSearch } from "react-icons/ci";
import { AiOutlineBell } from 'react-icons/ai';

const Header = ({role , onLogout}) => {
    return (
        <>
            {/* Primary Header */}
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
                                    Login As {role || 'User'}
                                </span>
                                <button
                                    className="btn-logout"
                                    onClick={onLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
