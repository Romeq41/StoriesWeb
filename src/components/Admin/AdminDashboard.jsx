import React, { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import {
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import UnapprovedStoryItem from "./UnapprovedStoryItem.jsx";
import ApprovedStoryItem from "./ApprovedStoryItem.jsx";
import Sidemenu from "./Sidemenu.jsx";
import "./AdminDashboard.css";
import UserMessageItem from "./UserMessageItem.jsx";

export default function AdminDashboard() {
  const [unapprovedStoryList, setUnapprovedStoryList] = useState([]);
  const [approvedStoriesList, setApprovedStoryList] = useState([]);
  const [userMessagesList, setUserMessagesList] = useState([]);
  const [isApprovedMenuVisible, setApprovedMenuVisible] = useState(false);
  const [isUnapprovedMenuVisible, setUnapprovedMenuVisible] = useState(true);
  const [isUserMessagesMenuVisible, setUserMessagesMenuVisible] =
    useState(false);

  useEffect(() => {
    getUnapprovedStoryList();
    getApprovedStoryList();
    getUserMessagesList();
  }, []);

  const handleApprove = async (id) => {
    const storyToUpdate = unapprovedStoryList.find((story) => story.id === id);

    if (storyToUpdate) {
      const storyDocRef = doc(db, "stories", id);

      try {
        await updateDoc(storyDocRef, { approved: true });

        setUnapprovedStoryList((prevStories) =>
          prevStories.filter((story) => story.id !== id)
        );

        setApprovedStoryList((prevStories) => [...prevStories, storyToUpdate]);
      } catch (error) {
        console.error("Error updating approval status in Firestore:", error);
      }
    }
  };

  const handleRemoveStory = async (id, isApproved) => {
    try {
      const storyDocRef = doc(db, "stories", id);
      await deleteDoc(storyDocRef);

      if (isApproved) {
        setApprovedStoryList((prevStories) =>
          prevStories.filter((story) => story.id !== id)
        );
      } else {
        setUnapprovedStoryList((prevStories) =>
          prevStories.filter((story) => story.id !== id)
        );
      }

      console.log("Removed story:", id);
    } catch (error) {
      console.error("Error deleting story from Firestore:", error);
    }
  };

  const handleRemoveUserMessage = async (id) => {
    try {
      const storyDocRef = doc(db, "userIssues", id);
      await deleteDoc(storyDocRef);

      setUserMessagesList((prevMessages) =>
        prevMessages.filter((message) => message.id !== id)
      );
    } catch (error) {
      console.error("Error deleting message from Firestore:", error);
    }
  };

  const handleApprovedMenu = () => {
    setApprovedMenuVisible(true);
    setUnapprovedMenuVisible(false);
    setUserMessagesMenuVisible(false);
  };

  const handleUnapprovedMenu = () => {
    setApprovedMenuVisible(false);
    setUnapprovedMenuVisible(true);
    setUserMessagesMenuVisible(false);
  };

  const handleUserMessagesMenu = () => {
    setApprovedMenuVisible(false);
    setUnapprovedMenuVisible(false);
    setUserMessagesMenuVisible(true);
  };

  const getUnapprovedStoryList = async () => {
    try {
      const storyCollectionRef = collection(db, "stories");
      const unapprovedQuery = query(
        storyCollectionRef,
        where("approved", "==", false)
      );
      const data = await getDocs(unapprovedQuery);
      const unapprovedStories = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUnapprovedStoryList(unapprovedStories);
    } catch (error) {
      console.error("Error fetching unapproved stories:", error);
    }
  };

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

  const getUserMessagesList = async () => {
    try {
      const userMessagesCollectionRef = collection(db, "userIssues");
      const data = await getDocs(userMessagesCollectionRef);
      const userMessages = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log("Fetched user messages:", userMessages);
      setUserMessagesList(userMessages);
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };

  return (
    <div className="admin-container">
      <Sidemenu
        onApprovedButtonClicked={handleApprovedMenu}
        onUnapprovedButtonClicked={handleUnapprovedMenu}
        onContactMessageButtonClicked={handleUserMessagesMenu}
        UnapprovedStoriesCounter={unapprovedStoryList.length}
        ApprovedStoriesCounter={approvedStoriesList.length}
        UserMessagesCounter={userMessagesList.length}
      />
      <div className="admin-view">
        {isApprovedMenuVisible && (
          <>
            <h2>Approved Stories</h2>
            <ul id="unapprovedlist">
              {approvedStoriesList.length === 0 ? (
                <p id="emptyListNotification">No Approved stories available</p>
              ) : (
                approvedStoriesList.map((story) => (
                  <ApprovedStoryItem
                    key={story.id}
                    story={story}
                    onRemove={() => handleRemoveStory(story.id, true)}
                  />
                ))
              )}
            </ul>
          </>
        )}
        {isUnapprovedMenuVisible && (
          <>
            <h2>Unapproved Stories</h2>
            <ul id="unapprovedlist">
              {unapprovedStoryList.length === 0 ? (
                <p id="emptyListNotification">
                  No Unapproved stories waiting for approval
                </p>
              ) : (
                unapprovedStoryList.map((story) => (
                  <UnapprovedStoryItem
                    key={story.id}
                    story={story}
                    onApprove={handleApprove}
                    onRemove={() => handleRemoveStory(story.id, false)}
                  />
                ))
              )}
            </ul>
          </>
        )}
        {isUserMessagesMenuVisible && (
          <>
            <h2>User Messages</h2>
            <ul id="unapprovedlist">
              {userMessagesList.length === 0 ? (
                <p id="emptyListNotification">No User Messages</p>
              ) : (
                userMessagesList.map((message) => (
                  <UserMessageItem
                    key={message.id}
                    message={message}
                    onRemove={() => handleRemoveUserMessage(message.id)}
                  />
                ))
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
