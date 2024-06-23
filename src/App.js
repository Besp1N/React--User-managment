import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/common/NavBar';
import LoginPage from './components/auth/LoginPage';
import RegistrationPage from './components/auth/RegistrationPage';
import FooterComponent from './components/common/Footer';
import UserService from './components/service/UserService.js';
import UpdateUser from './components/usersPage/UpdateUser';
import UserManagementPage from './components/usersPage/UserManagmentPage';
import ProfilePage from './components/usersPage/ProfilePage';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(UserService.isAuthenticated());
    const [isAdmin, setIsAdmin] = useState(UserService.isAdmin());

    useEffect(() => {
        setIsAuthenticated(UserService.isAuthenticated());
        setIsAdmin(UserService.isAdmin());
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
        setIsAdmin(UserService.isAdmin());
    };

    const handleLogout = () => {
        UserService.logout();
        setIsAuthenticated(false);
        setIsAdmin(false);
    };

    return (
        <BrowserRouter>
            <div className="App">
                <Navbar isAuthenticated={isAuthenticated} isAdmin={isAdmin} handleLogout={handleLogout} />
                <div className="content">
                    <Routes>
                        <Route exact path="/" element={<LoginPage onLogin={handleLogin} />} />
                        <Route exact path="/login" element={<LoginPage onLogin={handleLogin} />} />

                        {isAuthenticated && (
                            <>
                                <Route path="/profile" element={<ProfilePage />} />
                                {isAdmin && (
                                    <>
                                        <Route path="/register" element={<RegistrationPage />} />
                                        <Route path="/admin/user-management" element={<UserManagementPage />} />
                                        <Route path="/update-user/:userId" element={<UpdateUser />} />
                                    </>
                                )}
                            </>
                        )}

                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                </div>
                <FooterComponent />
            </div>
        </BrowserRouter>
    );
}

export default App;
