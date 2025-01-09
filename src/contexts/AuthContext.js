// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setToken(savedToken);
            fetchUserProfile(savedToken);
        } else {
            setLoading(false);
        }
    }, []);

    // A function to fetch the user's latest profile from /users/me
    const fetchUserProfile = async (jwt) => {
        try {
            const response = await axios.get("http://localhost:3000/users/me", {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user profile:", error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            setLoading(true);
            const res = await axios.post("http://localhost:3000/auth/login", { email, password });
            const { token: userToken } = res.data;
            setToken(userToken);
            localStorage.setItem("token", userToken);
            await fetchUserProfile(userToken);
        } catch (error) {
            console.error("Login error:", error);
            setLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                loading,
                login,
                logout,
                fetchUserProfile, // Expose so we can force refetch from other components
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
