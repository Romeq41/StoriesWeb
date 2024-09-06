import React from "react";
import "./CustomAlert.css";

export default function CustomAlert({ title, message, onClose }) {
    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="custom-alert-overlay" onClick={onClose}>
            <div className="custom-alert" onClick={stopPropagation} id="dialog">
                <strong>{title}</strong>
                <p>{message}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
