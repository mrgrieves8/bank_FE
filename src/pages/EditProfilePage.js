// src/pages/EditProfilePage.js
import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./EditProfilePage.css";

function EditProfilePage() {
    const { token, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState(user?.name || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [address, setAddress] = useState(user?.address || "");
    const [message, setMessage] = useState("");

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                "http://localhost:3000/users/me",
                { name, phone, address },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage("Profile updated!");
        } catch (error) {
            console.error("Error updating profile", error);
            setMessage("Error updating profile.");
        }
    };

    if (!user) {
        return (
            <div className="edit-profile-container">
                <h2>You are not logged in.</h2>
            </div>
        );
    }

    return (
        <div className="edit-profile-container">
            <h1>Edit Profile</h1>
            <form onSubmit={handleSave} className="edit-profile-form">
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>

                <label>
                    Phone:
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </label>

                <label>
                    Address:
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>

                <button type="submit">Save</button>
            </form>
            {message && <p className="edit-profile-message">{message}</p>}

            <button onClick={() => navigate("/dashboard")} className="back-button">
                Back to Dashboard
            </button>
        </div>
    );
}

export default EditProfilePage;
