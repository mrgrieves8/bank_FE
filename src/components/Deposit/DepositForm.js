// src/components/Deposit/DepositForm.js
import React, { useState } from "react";

function DepositForm({ onDeposit }) {
    const [amount, setAmount] = useState(0);
    const [currency, setCurrency] = useState("USD");

    const handleSubmit = (e) => {
        e.preventDefault();
        onDeposit(amount, currency);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Amount to Deposit:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Currency:</label>
                <input
                    type="text"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                />
            </div>
            <button type="submit">Deposit</button>
        </form>
    );
}

export default DepositForm;
