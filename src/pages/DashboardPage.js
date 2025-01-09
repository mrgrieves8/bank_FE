// src/pages/DashboardPage.js
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import "./DashboardPage.css";

function DashboardPage() {
    const navigate = useNavigate();
    const { token, user, loading, logout } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);
    const [fetchingTx, setFetchingTx] = useState(true);

    // 1. Fetch recent transactions
    useEffect(() => {
        const fetchRecentTx = async () => {
            if (!token) {
                setFetchingTx(false);
                return;
            }
            try {
                const response = await axios.get(
                    "http://localhost:3000/users/me/transactions?limit=3",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setTransactions(response.data.transactions);
            } catch (error) {
                console.error("Error fetching recent transactions", error);
            } finally {
                setFetchingTx(false);
            }
        };

        fetchRecentTx();
    }, [token]);

    // 2. Loading states
    if (loading) {
        return <div className="dashboard-container">Loading user info...</div>;
    }
    if (!user) {
        return (
            <div className="dashboard-container">
                <p>You are not logged in.</p>
                <button onClick={() => navigate("/")}>Go to Login</button>
            </div>
        );
    }

    // 3. Main Dashboard
    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <button onClick={logout} className="logout-button">
                Logout
            </button>

            <section className="user-info-section">
                <h2>Welcome, {user.name}!</h2>
                <p>Your account number: {user.accountNumber || "1234-5678"}</p>
                <p>
                    Balance: {user.balance} {user.currency || "USD"}
                </p>
                {user.phone && <p>Phone: {user.phone}</p>}
                {user.address && <p>Address: {user.address}</p>}
            </section>

            <section className="quick-actions-section">
                <h3>Quick Actions</h3>
                <button onClick={() => navigate("/deposit")}>Make a Deposit</button>
                <button onClick={() => navigate("/transactions")} style={{ marginLeft: "0.5rem" }}>
                    View All Transactions
                </button>
                <button onClick={() => navigate("/edit-profile")} style={{ marginLeft: "0.5rem" }}>
                    Edit Profile
                </button>
                <button onClick={() => navigate("/transfer")} style={{ marginLeft: "0.5rem" }}>
                    Make a Transfer
                </button>
            </section>

            <section className="recent-transactions-section">
                <h3>Recent Transactions</h3>
                {fetchingTx ? (
                    <p>Loading transactions...</p>
                ) : transactions.length === 0 ? (
                    <p>No recent transactions found.</p>
                ) : (
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
                )}
            </section>
        </div>
    );
}

export default DashboardPage;