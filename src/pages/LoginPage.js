// src/pages/LoginPage.js
import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";

function LoginPage() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (error) {
            console.error("Login error:", error);
            setMessage("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="auth-form-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin} className="auth-form">
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="example@mail.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="******"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p className="auth-message">{message}</p>}

            <div className="auth-switch">
                Don't have an account?{" "}
                <a onClick={() => navigate("/register")}>Register Here</a>
            </div>
        </div>
    );
}

export default LoginPage;
