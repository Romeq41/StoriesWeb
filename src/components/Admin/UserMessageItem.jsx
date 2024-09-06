import React, { useState } from "react";

export default function UserMessageItem({ message, onRemove }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const handleRemoveClick = (event) => {
    event.stopPropagation();
    onRemove(message.id);
  };

  const truncatedDesc =
    message.desc.length > 200 ? (
      <>
        {message.desc.slice(0, 200)}
        <span style={{ fontWeight: "bold", color: "black" }}>
          ... CLICK TO SEE MORE
        </span>
      </>
    ) : (
      message.desc
    );

  return (
    <li onClick={toggleDescription}>
      <strong>{message.title}</strong>
      <p>{isExpanded ? message.desc : truncatedDesc}</p>

      <button id="removeStoryButton" onClick={handleRemoveClick}>
        Remove
      </button>
    </li>
  );
}
