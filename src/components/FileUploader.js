import React from "react";

const FileUploader = ({ onFileUpload }) => {
    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            const fileContent = e.target.result;

            if (typeof fileContent !== "string") {
                console.error("File content is not a string:", fileContent);
                return;
            }

            console.log("Raw File Data:", fileContent); // Debugging log
            onFileUpload(fileContent);
        };

        reader.readAsText(file);
    };

    return (
        <div>
            <input type="file" accept=".shapefile" onChange={handleFileUpload} />
        </div>
    );
};

export default FileUploader;
