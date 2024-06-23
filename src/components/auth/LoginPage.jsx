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
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login!</button>
            </form>
        </div>
    )
}

export default LoginPage;
