import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";

function LoginPage({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');  // Clear any previous errors

        try {
            const userData = await UserService.login(email, password);
            console.log("userData:", userData);  // Log userData for debugging

            if (userData.token) {
                localStorage.setItem('token', userData.token);
                localStorage.setItem('role', userData.role);
                onLogin();  // Update App state to reflect authentication
                console.log("Navigating to /profile");  // Log before navigating
                navigate('/profile');
            } else {
                setError(userData.error);
            }
        } catch (e) {
            console.log("Login error:", e);
            setError('Login failed. Please try again.');
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    }
    return (
        <div>
            <h2 className="h2-login">Login</h2>
            {error && <p className="login-error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-input">
                    <label>Email: </label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-input">
                    <label>Password: </label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login!</button>
            </form>
        </div>
    )
}

export default LoginPage;
