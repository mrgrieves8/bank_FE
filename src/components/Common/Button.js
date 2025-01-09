// src/components/Common/Button.js
import React from "react";
import "./Button.css"; // optional styling

function Button({ children, onClick, type = "button", ...props }) {
    return (
        <button type={type} onClick={onClick} {...props}>
            {children}
        </button>
    );
}

export default Button;
