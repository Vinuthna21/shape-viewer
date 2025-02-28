import React, { useState } from "react";
import FileUploader from "./components/FileUploader";
import ShapeViewport from "./components/ShapeViewport";
import parseShapes from "./utils/shapeParser"; // Ensure path is correct
import "./App.css";

const App = () => {
    const [shapes, setShapes] = useState([]); // State for parsed shapes

    // Handle file upload
    const handleFileUpload = (fileContent) => {
        console.log("Received File Content:", fileContent); // Debugging log

        if (typeof fileContent !== "string") {
            console.error("Invalid file content format");
            return;
        }

        const parsedShapes = parseShapes(fileContent);
        console.log("Parsed Shapes:", parsedShapes); // Debugging log
        setShapes(parsedShapes);
    };

    return (
        <div className="app-container">
            {/* Top Toolbar */}
            <div className="toolbar">
                <h1 className="title">Shape Viewer</h1>
                <FileUploader onFileUpload={handleFileUpload} />
            </div>

            {/* Main Content Layout */}
            <div className="layout-container">
                {/* Left Menu */}
                <div className="left-menu">
                    <p>Open shape file</p>
                </div>

                {/* Centered Shape Viewport */}
                <div className="shape-viewport">
                    <ShapeViewport shapes={shapes} />
                </div>
            </div>
        </div>
    );
};

export default App;
