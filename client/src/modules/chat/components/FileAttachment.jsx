import React, { useState } from "react";

const FileAttachment = ({ onFileSelected }) => {
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      onFileSelected(selectedFile);
    }
  };

  return <input type="file" onChange={handleFileChange} />;
};

export default FileAttachment;

// <FileAttachment onFileSelected={(file) => handleFileAttachment(file)} />
