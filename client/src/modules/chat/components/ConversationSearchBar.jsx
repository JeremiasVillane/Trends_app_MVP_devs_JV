import React, { useState } from "react";
import styles from "./ConversationSearchBar.module.css";

const ConversationSearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className={styles.search_bar}>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default ConversationSearchBar;
