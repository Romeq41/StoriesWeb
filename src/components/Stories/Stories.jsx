import React, { useEffect, useState } from "react";
import "./Stories.css";
import { db } from "../../firebase-config";
import {
  getDocs,
  collection,
  doc,
  updateDoc,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import StoryItem from "./StoryItem";
import CustomAlert from "../CustomAlert/CustomAlert";

export default function Stories() {
  const [likedStories, setLikedStories] = useState({});
  const [approvedStoriesList, setApprovedStoryList] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const getApprovedStoryList = async () => {
    try {
      const storyCollectionRef = collection(db, "stories");
      const approvedQuery = query(
        storyCollectionRef,
        where("approved", "==", true)
      );
      const data = await getDocs(approvedQuery);
      const approvedStories = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log("Fetched approved stories:", approvedStories);
      setApprovedStoryList(approvedStories);
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });

    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach((el) => observer.observe(el));

    getApprovedStoryList();

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleToggleDescription = (title, desc) => {
    setAlertTitle(title);
    setAlertMessage(desc);
    setShowAlert(true);
  };

  const handleLike = async (id, currentLikeCount, event) => {
    const isLiked = likedStories[id];
    const newLikeCount = isLiked ? currentLikeCount - 1 : currentLikeCount + 1;

    event.target.style.backgroundColor = "green";

    setApprovedStoryList((prevStories) =>
      prevStories.map((story) =>
        story.id === id ? { ...story, likeCount: newLikeCount } : story
      )
    );

    setLikedStories((prevLikedStories) => ({
      ...prevLikedStories,
      [id]: !isLiked,
    }));

    const storyDocRef = doc(db, "stories", id);

    try {
      await updateDoc(storyDocRef, {
        likeCount: newLikeCount,
      });
    } catch (error) {
      console.error("Error updating like count in Firestore:", error);
    }
  };

  return (
    <>
      <div id="StoriesHeader">
        {approvedStoriesList.length === 0 ? (
          <h1>No Stories Today Yet.</h1>
        ) : (
          <h1>Latest Stories</h1>
        )}
      </div>

      <div id="Stories">
        {approvedStoriesList.map((story) => (
          <StoryItem
            key={story.id}
            story={story}
            onLike={handleLike}
            isLiked={likedStories[story.id]}
            onToggleDescription={handleToggleDescription}
          />
        ))}
      </div>

      {showAlert && (
        <CustomAlert
          title={alertTitle}
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
    </>
  );
}
