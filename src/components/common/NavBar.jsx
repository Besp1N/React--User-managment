import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ isAuthenticated, isAdmin, handleLogout }) {
    const navigate = useNavigate();

    const onLogout = () => {
        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            handleLogout();
            navigate('/login');  // Redirect to login page after logout
        }
    };

    return (
        <nav className="navigation">
            <ul>
                {<li><Link to="/">Home</Link></li>}
                {!isAuthenticated && <li><Link to="/login">Login</Link></li>}
                {isAuthenticated && <li><Link to="/profile">Profile</Link></li>}
                {isAdmin && <li><Link to="/admin/user-management">User Management</Link></li>}
                {isAuthenticated && <li><Link to="/" onClick={onLogout}>Logout</Link></li>}
            </ul>
        </nav>
    );
}

export default Navbar;
