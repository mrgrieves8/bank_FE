// Suppose in src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import DashboardPage from "./pages/DashboardPage";
import DepositPage from "./pages/DepositPage";
import EditProfilePage from "./pages/EditProfilePage";
import MakeTransferPage from "./pages/MakeTransferPage";
import LoginPage from "./pages/LoginPage";
import "./App.css";
import TransactionsPage from "./pages/TransactionsPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/deposit" element={<DepositPage />} />
                    <Route path="/edit-profile" element={<EditProfilePage />} />
                    <Route path="/transfer" element={<MakeTransferPage />} />
                    <Route path="/transactions" element={<TransactionsPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    {/* add more as needed */}
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
