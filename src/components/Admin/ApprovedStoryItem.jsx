import React, { useState } from "react";

export default function ApprovedStoryItem({ story, onRemove }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const handleRemoveClick = (event) => {
    event.stopPropagation();
    onRemove(story.id);
  };

  const truncatedDesc =
    story.desc.length > 200 ? (
      <>
        {story.desc.slice(0, 200)}
        <span style={{ fontWeight: "bold", color: "black" }}>
          ... CLICK TO SEE MORE
        </span>
      </>
    ) : (
      story.desc
    );

  return (
    <li onClick={toggleDescription}>
      <strong>{story.title}</strong>
      <p>{isExpanded ? story.desc : truncatedDesc}</p>

      <button id="removeStoryButton" onClick={handleRemoveClick}>
        Remove
      </button>
    </li>
  );
}
