import React from "react";
import { Picker } from "emoji-mart";
// import "emoji-mart/css/emoji-mart.css";

const EmojiSelector = ({ onSelect }) => {
  return (
    <div className="emoji-selector">
      <Picker onSelect={onSelect} emojiTooltip={true} />
    </div>
  );
};

export default EmojiSelector;

// <EmojiSelector onSelect={(emoji) => handleEmojiSelection(emoji)} />
