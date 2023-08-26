import React from "react";

const ThreadSidebar = ({ parentMessage, threadedReplies, onClose }) => {
  return (
    <div className="thread-sidebar">
      <div className="thread-header">
        <button onClick={onClose}>Close</button>
        <span>Threaded Replies</span>
      </div>
      <div className="thread-content">
        <div className="parent-message">
          <strong>{parentMessage.author}</strong>: {parentMessage.content}
        </div>
        {threadedReplies.map((reply) => (
          <div key={reply.id} className="threaded-reply">
            <strong>{reply.author}</strong>: {reply.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreadSidebar;

/**
 *
 * <ThreadSidebar
 * parentMessage={selectedParentMessage}
 * threadedReplies={selectedThreadedReplies}
 * onClose={handleThreadSidebarClose}
 * />
 *
 */
