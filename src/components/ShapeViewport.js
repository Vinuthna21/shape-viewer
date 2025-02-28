import React from "react";

const ShapeViewport = ({ shapes }) => {
    console.log("Shapes to render:", shapes); // Debugging log

    return (
        <div className="viewport">
            {shapes.map((shape, index) => {
                if (!shape.type) {
                    console.warn("Shape missing type:", shape);
                    return null;
                }

                console.log("Shape Data:", shape); // Debug log

                if (shape.type === "rectangle") {
                    const rotationAngle = shape.rotation ? shape.rotation : 0;

                    // Calculate center position
                    const centerX = shape.x + shape.width / 2;
                    const centerY = shape.y + shape.height / 2;

                    return (
                        <div
                            key={index}
                            style={{
                                position: "absolute",
                                width: `${shape.width}px`,
                                height: `${shape.height}px`,
                                backgroundColor: shape.color,
                                zIndex: shape.zIndex || 0,
                                left: `${centerX}px`,
                                top: `${centerY}px`,
                                transform: `translate(-50%, -50%) rotate(${rotationAngle}deg)`,
                                transformOrigin: "center center",
                            }}
                        />
                    );
                } else if (shape.type === "polygon") {
                    return (
                        <svg
                            key={index}
                            style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                zIndex: shape.zIndex || 0,
                            }}
                        >
                            <polygon points={shape.points.map(p => p.join(",")).join(" ")} fill={shape.color} />
                        </svg>
                    );
                } else {
                    console.warn("Unknown shape type:", shape);
                    return null;
                }
            })}
        </div>
    );
};

export default ShapeViewport;
