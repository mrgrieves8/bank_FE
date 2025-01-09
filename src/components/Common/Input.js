// src/components/Common/Input.js
import React from "react";

function Input({ label, type = "text", value, onChange, ...props }) {
    return (
        <div>
            <label>
                {label}
                <input type={type} value={value} onChange={onChange} {...props} />
            </label>
        </div>
    );
}

export default Input;
