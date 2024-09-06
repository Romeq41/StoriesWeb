import React, { useState } from 'react';
import './AddStoryDialog.css';

export default function AddStoryDialog({ onSubmit, toggleDialog, onClose }) {
    const [title, setTitle] = useState('');
    const [desc, setDescription] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (onSubmit) {
            onSubmit({ title, desc });
        }

        setIsSuccess(true);

        setTimeout(() => {
            setIsSuccess(false);
            if (toggleDialog) {
                toggleDialog();
            }
            setTitle('');
            setDescription('');
        }, 1500);
    };

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="custom-alert-overlay" onClick={onClose}>
            <div className="addStoryDialog" id="dialog" onClick={stopPropagation}>
                <h1>Add Your Story</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="storyTitle">Title:</label>
                        <input
                            type="text"
                            id="storyTitle"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={40}
                            placeholder="Enter story title"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="storyDescription">Description:</label>
                        <textarea
                            id="storyDescription"
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
