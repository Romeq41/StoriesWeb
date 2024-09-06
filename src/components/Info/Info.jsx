import React, { useState } from 'react';
import './Info.css';
import AddIssueDialog from '../AddIssueDialog/AddIssueDialog';
import { db } from "../../firebase-config"; 
import { collection, addDoc, serverTimestamp} from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js';


export default function Info() {
    const [isDialogVisible, setIsDialogVisible] = useState(false);

    const toggleDialog = () => {
        setIsDialogVisible(prevState => !prevState);
    };

    const handleAddIssue = async (issue) => {
        console.log("Story to be added:", issue);

        try {
            const userIssueCollectionRef = collection(db, "userIssues");

            await addDoc(userIssueCollectionRef, {
                title: issue.title,
                desc: issue.desc,
                createdAt: serverTimestamp(),
                email: issue.email
            });

            console.log("Issue has been added!");
        } catch (error) {
            console.error("Error adding issue: ", error);
        }
    };

    return (
        <div className="info">
            <a href="#"><h1>StoryTime</h1></a>
            <a href="#"><h1>About</h1></a>
            <a onClick={toggleDialog}><h1 >Contact</h1></a>

            {isDialogVisible && (
                <AddIssueDialog
                    onSubmit={handleAddIssue}
                    toggleDialog={toggleDialog}
                    onClose={toggleDialog}
                />
            )}
        </div>
    );
}
