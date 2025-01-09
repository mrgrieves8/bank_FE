// src/pages/TransactionsPage.js
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./TransactionsPage.css";


function TransactionsPage() {
    const { token } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllTx = async () => {
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get("http://localhost:3000/users/me/transactions", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTransactions(response.data.transactions);
            } catch (error) {
                console.error("Error fetching all transactions", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllTx();
    }, [token]);

    if (loading) {
        return <div className="transactions-container">Loading transactions...</div>;
    }

    if (transactions.length === 0) {
        return (
            <div className="transactions-container">
                No transactions found.
                <button
                    onClick={() => navigate("/dashboard")}
                    className="back-button"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="transactions-container">
            <h1>All Transactions</h1>
            <ul className="transactions-list">
                {transactions.map((tx) => (
                    <li key={tx.transactionId} className="transaction-item">
                        <strong className="tx-type">{tx.type}</strong> — {tx.amount} {tx.currency}
                        {tx.recipientAccountNumber && ` to ${tx.recipientAccountNumber}`}
                        <div className="tx-meta">
                            {new Date(tx.timestamp).toLocaleString()} | {tx.description}
                        </div>
                    </li>
                ))}
            </ul>
            {/* Back to Dashboard button at the bottom */}
            <button
                onClick={() => navigate("/dashboard")}
                className="back-button"
            >
                Back to Dashboard
            </button>
        </div>
    );
}

export default TransactionsPage;
