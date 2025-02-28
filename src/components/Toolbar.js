import React from "react";

const Toolbar = ({ onShapesParsed }) => {
    const fileInputRef = React.createRef();

    const handleOpenFile = () => {
        fileInputRef.current.click();
    };

    const handleFileUpload = (event) => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                console.log("📂 File Content Loaded in Toolbar");
                const text = e.target.result;
                const shapes = parseShapes(text);
                onShapesParsed(shapes);
            };
            reader.readAsText(file);
        }
    };

    const parseShapes = (text) => {
        const lines = text.split("\n").map(line => line.trim()).filter(line => line);
        return lines.map(line => {
            const parts = line.split(",");
            if (parts[0] === "Rectangle") {
                return {
                    type: "rectangle",
                    x: parseInt(parts[1], 10),
                    y: parseInt(parts[2], 10),
                    z: parseInt(parts[3], 10),
                    width: parseInt(parts[4], 10),
                    height: parseInt(parts[5], 10),
                    color: `#${parts[6]}`,
                };
            } else if (parts[0] === "Polygon") {
                return {
                    type: "polygon",
                    color: `#${parts[1]}`,
                    points: parts.slice(2).map(point => point.trim()).join(" "),
                };
            }
            return null;
        }).filter(shape => shape);
    };

    return (
        <div className="toolbar">
            <h2>Shape Viewer</h2>
            <button onClick={handleOpenFile}>Open Shape File</button>
            <input
                type="file"
                ref={fileInputRef}
                accept=".shapefile"
                style={{ display: "none" }}
                onChange={handleFileUpload}
            />
        </div>
    );
};

export default Toolbar;
