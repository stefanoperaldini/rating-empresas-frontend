import React, { useState, useRef, useEffect } from "react";
import { uploadLogo } from "../http/companyService";

export function FileUpload() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const fileInput = useRef();

  useEffect(() => {
    async function getPreviews() {
      const promises = files.map(getPreview);
      setPreviews(await Promise.all(promises));
    }

    getPreviews();
  }, [files]);

  const handleChange = e => {
    if (files.length === 0) {
      setFiles([...Array.from(e.target.files), ...files]);
    } else if (files.length === 1) {
      setFiles([...Array.from(e.target.files)]);
    }
  };

  const handleUpload = () => {
    if (!files) {
      return;
    }

    const data = new FormData();

    files.forEach(file => {
      data.append("logo", file);
    });

    setUploading(true);

    return uploadLogo(data)
      .then(response => {
        console.log(response);
        setFiles([]);
        setUploading(false);
      })
      .catch(error => {
        setUploading(false);
        console.log(error);
      });
  };

  const openFileDialog = () => {
    fileInput.current.click();
  };

  return (
    <main>
      <div>
        <input ref={fileInput} type="file" onChange={handleChange} />
        <button type="button" onClick={openFileDialog} disabled={uploading}>
          {uploading ? "Uploading files ..." : "Choose File"}
        </button>
        <ul>
          {files.map((file, i) => (
            <li key={file.name}>
              <img src={previews[i]} alt={file.name} />
              <span>{file.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <button type="button" onClick={handleUpload} disabled={uploading}>
        Upload
      </button>
    </main>
  );
}

function getPreview(file) {
  return new Promise(resolve => {
    if (file && file.type.includes("image")) {
      let reader = new FileReader();

      reader.onloadend = function() {
        resolve(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      resolve("http://via.placeholder.com/50x50");
    }
  });
}
