import React from 'react';

const Dashboard = ({ user, onLogout }) => {
    return (
        <div className="container mt-5">
            <h1>Welcome, {user.email}!</h1>
            <p>Your role: {user.role}</p>
            <button className="btn btn-danger" onClick={onLogout}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
