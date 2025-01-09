// src/pages/DepositPage.js
import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./DepositPage.css";

function DepositPage() {
    const navigate = useNavigate();
    const { token, fetchUserProfile } = useContext(AuthContext);

    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");

    const handleDeposit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                "http://localhost:3000/users/me/deposit",
                {
                    amount: parseFloat(amount),
                    currency: "ILS",
                    description: "Deposit",
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessage("Deposit successful!");

            await fetchUserProfile(token);
        } catch (error) {
            console.error("Error depositing funds:", error);
            setMessage("Error depositing funds.");
        }
    };

    return (
        <div className="deposit-page-container">
            <h1>Make a Deposit</h1>
            <form onSubmit={handleDeposit} className="deposit-form">
                <div className="form-group">
                    <label>Amount:</label>
                    <input
                        type="number"
                        step="0.01"
                        required
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <button type="submit" className="deposit-button">Deposit</button>
            </form>
            {message && <p className="deposit-message">{message}</p>}
            <button onClick={() => navigate("/dashboard")} className="back-button">
                Back to Dashboard
            </button>
        </div>
    );
}

export default DepositPage;
