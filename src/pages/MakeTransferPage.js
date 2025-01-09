// src/pages/MakeTransferPage.js
import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./MakeTransferPage.css";

function MakeTransferPage() {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const [recipientAccountNumber, setRecipientAccountNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [currency, setCurrency] = useState("USD");
    const [description, setDescription] = useState("Payment");
    const [message, setMessage] = useState("");

    const handleTransfer = async (e) => {
        e.preventDefault();
        try {
            // POST /users/me/transactions
            await axios.post(
                "http://localhost:3000/users/me/transactions",
                {
                    recipientAccountNumber,
                    amount: parseFloat(amount),
                    currency,
                    description,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setMessage("Transfer successful!");
        } catch (error) {
            console.error("Error making transfer", error);
            setMessage("Error making transfer.");
        }
    };

    return (
        <div className="make-transfer-container">
            <h1>Make a Transfer</h1>
            <form onSubmit={handleTransfer} className="make-transfer-form">
                <label>
                    Recipient Account Number:
                    <input
                        type="text"
                        required
                        value={recipientAccountNumber}
                        onChange={(e) => setRecipientAccountNumber(e.target.value)}
                    />
                </label>

                <label>
                    Amount:
                    <input
                        type="number"
                        step="0.01"
                        required
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </label>

                <label>
                    Currency:
                    <input
                        type="text"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    />
                </label>

                <label>
                    Description:
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>

                <button type="submit">Transfer</button>
            </form>
            {message && <p className="make-transfer-message">{message}</p>}

            <button onClick={() => navigate("/dashboard")} className="back-button">
                Back to Dashboard
            </button>
        </div>
    );
}

export default MakeTransferPage;
