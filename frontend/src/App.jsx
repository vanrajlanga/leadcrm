import React, { useState } from 'react';
import LoginPage from './components/LoginPage';

const App = () => {
    const [token, setToken] = useState('');
    const [role, setRole] = useState(null);

    const handleLogin = (authToken, roleId) => {
        setToken(authToken);
        setRole(roleId);
        localStorage.setItem('token', authToken);
        localStorage.setItem('role', roleId);
    };

    const handleLogout = () => {
        setToken('');
        setRole(null);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    };

    if (!token) {
        return <LoginPage onLogin={handleLogin} />;
    }

    return (
        <div>
            <h1>Welcome, {role === 1 ? 'Admin' : role === 2 ? 'Manager' : 'User'}</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default App;
