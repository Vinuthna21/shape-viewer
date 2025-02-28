const parseShapes = (fileContent) => {
  const lines = fileContent.split("\n").map((line) => line.trim());
  const shapes = [];

  lines.forEach((line) => {
    if (!line) return;

    const parts = line.split(",").map((p) => p.trim());
    const shapeType = parts[0].toLowerCase();

    if (shapeType === "rectangle") {
      const [x, y, zIndex, width, height, color, rotation] = parts.slice(1);
      shapes.push({
        type: "rectangle",
        x: parseInt(x, 10),
        y: parseInt(y, 10),
        zIndex: parseInt(zIndex, 10),
        width: parseInt(width, 10),
        height: parseInt(height, 10),
        color,
        rotation: rotation ? parseFloat(rotation) : 0,
      });
    } else if (shapeType === "polygon") {
      const color = parts[1];

      // Fix: Properly split points while ensuring valid numbers
      const points = [];
      for (let i = 2; i < parts.length; i += 2) {
        const x = parseInt(parts[i], 10);
        const y = parseInt(parts[i + 1], 10);
        if (!isNaN(x) && !isNaN(y)) {
          points.push([x, y]);
        }
      }

      if (points.length) {
        shapes.push({
          type: "polygon",
          color,
          points,
        });
      } else {
        console.warn("Invalid Polygon Data:", line);
      }
    } else {
      console.warn("Unknown shape type:", shapeType);
    }
  });

  return shapes;
};

export default parseShapes;
