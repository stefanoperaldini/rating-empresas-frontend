import React, { useState, useRef, } from "react";
import { uploadLogo } from "../http/companyService";

export function FileUpload({ onUploadLogo }) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef();

  const handleChange = e => {
    setFiles([...Array.from(e.target.files)]);
  };

  const handleUpload = async () => {
    if (!files) {
      return;
    }

    const data = new FormData();

    files.forEach(file => {
      data.append("logo", file);
    });

    setUploading(true);

    try {
      const { headers } = await uploadLogo(data);
      onUploadLogo(headers.location);
      setFiles([]);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    };
  };

  const openFileDialog = () => {
    fileInput.current.click();
  };

  return (
    <div>
      <input
        ref={fileInput}
        type="file"
        accept="png"
        onChange={handleChange}
      />
      <button type="button" onClick={openFileDialog} disabled={uploading}>
        {uploading ? "Uploading files ..." : "Choose File"}
      </button>
      <button type="button" onClick={handleUpload} disabled={uploading}>
        Upload
      </button>
    </div>
  );
}