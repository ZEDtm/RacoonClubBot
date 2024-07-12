import React, { useState } from "react";
import classes from "./FileInput.module.css";

function FileInput({ onFileChange }) {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        onFileChange(selectedFile);
    };

    return (
        <div className={classes.fileInputContainer}>
            <input
                className={classes.fileInput}
                type="file"
                onChange={handleFileChange}
                accept="image/*"
            />
        </div>
    );
}

export default FileInput;