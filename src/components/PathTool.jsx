import React, { useState } from 'react';

function PathTool({ onDraw }) {
  const [points, setPoints] = useState([]);

  const handleClick = (e) => {
    const newPoint = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    setPoints([...points, newPoint]);
    onDraw(points.concat(newPoint));
  };

  return <svg width="800" height="600" onClick={handleClick} />;
}

export default PathTool;