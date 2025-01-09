// src/components/Dashboard/AccountInfo.js
import React from "react";

function AccountInfo({ name, balance, currency }) {
    return (
        <div>
            <h2>{name}'s Account</h2>
            <p>Balance: {balance} {currency}</p>
        </div>
    );
}

export default AccountInfo;
