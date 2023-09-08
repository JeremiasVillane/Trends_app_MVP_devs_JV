import React from "react";
import styles from "./ConversationSearchBar.module.css";

export const ConversationSearchBar = ({ onSearch }) => {
  const handleSearchChange = (event) => {
    const query = event.target.value;
    onSearch(query);
  };

  return (
    <div className={styles.search_bar}>
      <input
        type="text"
        name="search_bar"
        placeholder="Buscar..."
        onChange={handleSearchChange}
      />
    </div>
  );
};
