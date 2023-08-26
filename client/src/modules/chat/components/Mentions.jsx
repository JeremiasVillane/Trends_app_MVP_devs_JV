import React from "react";

const Mentions = ({ mentionedUsers }) => {
  return (
    <div className="mentions">
      {mentionedUsers.map((user, index) => (
        <span key={index} className="mention">
          @{user.username}
        </span>
      ))}
    </div>
  );
};

export default Mentions;

/**
 *
 * <Mentions
 * mentionedUsers={[
 *   { username: "user1" },
 *   { username: "user2" },
 * ]}
 * />;
 *
 */
