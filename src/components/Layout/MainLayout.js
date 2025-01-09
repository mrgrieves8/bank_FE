// src/components/Layout/MainLayout.js
import React from "react";
import Navbar from "../Common/Navbar"; // example
import Footer from "../Common/Footer"; // example

function MainLayout({ children }) {
    return (
        <div className="main-layout">
            <Navbar />
            <div className="content">{children}</div>
            <Footer />
        </div>
    );
}

export default MainLayout;
