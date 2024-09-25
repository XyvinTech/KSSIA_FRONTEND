import React, { useState } from "react";
import { toast } from "react-toastify";
import { updatefile } from "../api/file-api";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const result = await updatefile(formData);
      console.log("Uploaded successfully:", result);
    } catch (error) {
      toast.error(`Upload failed: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Upload File</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default FileUpload;
