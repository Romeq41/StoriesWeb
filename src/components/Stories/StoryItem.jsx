import React, { useState,useEffect} from "react";
import "./StoryItem.css";
import CustomAlert from "../CustomAlert/CustomAlert";

export default function StoryItem({ story, onLike, isLiked, onToggleDescription}) {

    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                } else {
                    entry.target.classList.remove('show');
                }
            });
        });
  
        const hiddenElements = document.querySelectorAll('.hidden');
        hiddenElements.forEach((el) => observer.observe(el));
  
        return () => {
            hiddenElements.forEach((el) => observer.unobserve(el));
        };
  
    }, []);
    

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
        setAlertMessage(story.desc);
        setAlertTitle(story.title);
        
    };

    const truncatedDesc = story.desc.length > 310 
        ? (
            <>
                {story.desc.slice(0, 310)}
                ... <span id="clickMoreText" onClick={toggleDescription}>CLICK TO SEE MORE</span>
            </>
        ) 
        : story.desc;


    return (
        <div className="hidden"> 
        <div className="Story" >
            <p id="storyTitle">{story.title}</p>
            <p id="storyDescription" onClick={toggleDescription}>{isExpanded ? story.desc : truncatedDesc}</p>
            <button
                onClick={(event) => onLike(story.id, story.likeCount, event)}
                disabled={isLiked}
            >
                Like {story.likeCount}
            </button>
            
        </div>
            
        </div>
    );
}
