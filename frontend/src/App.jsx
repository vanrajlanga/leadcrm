import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import { fetchRoles } from './api/roles';

const App = () => {
    const [user, setUser] = useState(null); // Store logged-in user details
    const [roleMap, setRoleMap] = useState({}); // Dynamically store roles
    const [roles, setRoles] = useState([]); // Pass roles as props to LoginPage
    const hasFetchedRoles = useRef(false); // Track if roles have been fetched

    // Load user from localStorage on app load
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Rehydrate user state
        }
    }, []);

    // Fetch roles on app load
    useEffect(() => {
        if (hasFetchedRoles.current) return; // Prevent duplicate API calls
        hasFetchedRoles.current = true;

        const getRoles = async () => {
            try {
                const rolesData = await fetchRoles();
                const dynamicRoleMap = {};
                rolesData.forEach((role) => {
                    dynamicRoleMap[role.id] = role.name;
                });
                setRoleMap(dynamicRoleMap);
                setRoles(rolesData); // Store roles for LoginPage
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        getRoles();
    }, []);

    const handleLogin = (token, role_id, email) => {
        const role = roleMap[role_id] || 'User'; // Dynamically get role name
        const userData = { email, role };
        setUser(userData);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData)); // Persist user session
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        user ? (
                            <Navigate to="/dashboard" replace />
                        ) : (
                            <LoginPage roles={roles} onLogin={handleLogin} />
                        )
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        user ? (
                            <Dashboard user={user} onLogout={handleLogout} />
                        ) : (
                            <Navigate to="/" replace />
                        )
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
