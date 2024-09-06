import React, { useState } from 'react';
import './AddIssueDialog.css';

export default function AddIssueDialog({ onSubmit, toggleDialog, onClose }) {
    const [title, setTitle] = useState('');
    const [desc, setDescription] = useState('');
    const [email,setEmail] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (onSubmit) {
            onSubmit({ title, desc, email});
        }

        setIsSuccess(true);

        setTimeout(() => {
            setIsSuccess(false);
            if (toggleDialog) {
                toggleDialog();
            }
            setTitle('');
            setDescription('');
            setEmail('');
        }, 3000);
    };

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="custom-alert-overlay" onClick={onClose}>
            <div className="addIssueDialog" id="dialog" onClick={stopPropagation}>
                <h1>Contact Form</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="issueEmail">Email:</label>
                        <input
                            type='email'
                            id="issueEmail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            maxLength={100}
                            placeholder="Enter story description"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="issueTitle">Title:</label>
                        <input
                            type="text"
                            id="issueTitle"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={40}
                            placeholder="Enter story title"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="issueDescription">Description:</label>
                        <textarea
                            id="issueDescription"
                            value={desc}
                            onChange={(e) => setDescription(e.target.value)}
                            maxLength={666}
                            placeholder="Enter story description"
                            required
                        />
                    </div>
                    
                    <button
                        type="submit"
                        id="submitButton"
                        className={isSuccess ? 'success' : ''}
                        disabled={isSuccess}
                    >
                        {isSuccess ? 'Success!' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
}
