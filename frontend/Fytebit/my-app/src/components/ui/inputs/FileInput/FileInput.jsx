import React from "react"
import classes from "./FileInput.module.css"

function FileInput(file, setFile) {
    // const [file, setFile] = React.useState(null)
    return(
        <div className={classes.fileInputContainer}>
            <input 
            className={classes.fileInput}
            type="file" 
            onInput={event => setFile(event.target.file)} 
            file={file}/>
        </div>
    )
}

export default FileInput