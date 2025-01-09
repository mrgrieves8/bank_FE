// src/pages/RegisterPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";

function RegisterPage() {
    const navigate = useNavigate();

    // Form state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/auth/register", {
                name,
                email,
                password,
            });
            setMessage("Registration successful! You can now login.");
        } catch (error) {
            console.error("Registration error:", error);
            setMessage("Error registering. Please check your info.");
        }
    };

    return (
        <div className="auth-form-container">
            <h1>Register</h1>
            <form onSubmit={handleRegister} className="auth-form">
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Your name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
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
                <button type="submit">Register</button>
            </form>
            {message && <p className="auth-message">{message}</p>}

            <div className="auth-switch">
                Already have an account?{" "}
                <a onClick={() => navigate("/")}>Login Here</a>
            </div>
        </div>
    );
}

export default RegisterPage;
