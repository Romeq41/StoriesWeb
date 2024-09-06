import React, { useState, useEffect } from "react";
import "./Sidemenu.css";

export default function Sidemenu({
  onApprovedButtonClicked,
  onUnapprovedButtonClicked,
  onContactMessageButtonClicked,
  UnapprovedStoriesCounter,
  ApprovedStoriesCounter,
  UserMessagesCounter,
}) {
  const [isMenuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const menu = document.querySelector(".sideMenu");
    if (isMenuVisible) {
      menu.classList.remove("hideSideMenu");
      menu.classList.add("showSideMenu");
    } else {
      menu.classList.remove("showSideMenu");
      menu.classList.add("hideSideMenu");
    }
  }, [isMenuVisible]);

  const toggleMenu = () => {
    setMenuVisible((prevState) => !prevState);
  };

  return (
    <>
      <div className="hamburger-menu" onClick={toggleMenu}>
        &#9776;
      </div>
      <div className="sideMenu hideSideMenu">
        <div
          id="sideMenuBurger"
          className="hamburger-menu"
          onClick={toggleMenu}
        >
          &#9776;
        </div>
        <h1 id="pageTitle">Admin Page</h1>
        <button
          className="sideButton"
          id="unapprovedMenuButton"
          onClick={() => {
            toggleMenu();
            onUnapprovedButtonClicked();
          }}
        >
          Unapproved Stories
          <span className="count">{UnapprovedStoriesCounter}</span>
        </button>
        <button
          className="sideButton"
          id="approvedMenuButton"
          onClick={() => {
            onApprovedButtonClicked();
            toggleMenu();
          }}
        >
          Approved Stories
          <span className="count">{ApprovedStoriesCounter}</span>
        </button>
        <button
          className="sideButton"
          id="contactFormMessages"
          onClick={() => {
            onContactMessageButtonClicked();
            toggleMenu();
          }}
        >
          Contact Form Messages
          <span className="count">{UserMessagesCounter}</span>
        </button>
      </div>
    </>
  );
}
