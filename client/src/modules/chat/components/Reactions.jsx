import React from "react";

const Reactions = ({ reactions }) => {
  return (
    <div className="reactions">
      {reactions.map((reaction, index) => (
        <span key={index} className="reaction">
          {reaction.emoji} {reaction.count}
        </span>
      ))}
    </div>
  );
};

export default Reactions;

/**
 * 
 * <Reactions
 * reactions={[
 * { emoji: '👍', count: 10 },
 * { emoji: '😄', count: 5 },
 * ]}
 * />
 * 
 */
