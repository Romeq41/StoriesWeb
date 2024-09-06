import React, { useState } from 'react';
import './Header.css';
import AddStoryDialog from '../AddStoryDialog/AddStoryDialog.jsx'
import { db } from "../../firebase-config"; 
import { collection, addDoc} from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js';

export default function Header() {
    const [isDialogVisible, setIsDialogVisible] = useState(false);

    const handleAddStory = async (story) => {
        console.log("Story to be added:", story);
        console.log(story.title)
        console.log(story.description)
        
        try {
            const storyCollectionRef = collection(db,"stories");
        
            await addDoc(storyCollectionRef, {
                title:story.title,
                desc:story.desc,
                likeCount: 0,
                approved: false
            });

            console.log("Story has been added!");
        } catch (error) {
            console.error("Error adding story: ",error);
        }
        
    };

    const toggleDialog = () => {
        setIsDialogVisible(prevState => {
            if (prevState) {
                turnOffOverlayVisibility();
            } else {
                document.body.style.overflow = 'hidden';
                setIsDialogVisible(true);
            }
            return !prevState;
        });
    };

    const turnOffOverlayVisibility = () => {
        setIsDialogVisible(false);
        document.body.style.overflow = 'auto';
    };

    return (
        <>
            <header>
                <div className="logo">
                    <h1>StoryTime</h1>
                </div>
                <div className="menu">
                    <div className="headerButton">
                        <button onClick={toggleDialog}>
                            {isDialogVisible ? "Close" : "Add Your Story!"}
                        </button>
                    </div>
                </div>
            </header>


            {isDialogVisible && 
                <AddStoryDialog 
                    onSubmit={handleAddStory} 
                    toggleDialog={toggleDialog}
                    onClose={toggleDialog}
                />
            }
        </>
    );
}
