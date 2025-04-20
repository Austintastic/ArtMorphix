import React, { useState } from 'react';

function DrawTool({ pan, zoom, onDrawComplete }) {
  const [startPoint, setStartPoint] = useState(null);
  const [currentPoint, setCurrentPoint] = useState(null);

  const getArtboardCoordinates = (e) => {
    const svg = e.currentTarget.closest('svg');
    const rect = svg.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;
    return { x, y };
  };

  const handleClick = (e) => {
    e.stopPropagation();
    const point = getArtboardCoordinates(e);

    if (!startPoint) {
      // First click - set start point
      setStartPoint(point);
      setCurrentPoint(point);
    } else {
      // Second click - complete the line
      onDrawComplete([startPoint, point]);
      setStartPoint(null);
      setCurrentPoint(null);
    }
  };

  const handleMouseMove = (e) => {
    if (startPoint) {
      e.stopPropagation();
      const point = getArtboardCoordinates(e);
      setCurrentPoint(point);
    }
  };

  return (
    <>
      <rect 
        x="0" 
        y="0" 
        width="100%" 
        height="100%" 
        fill="transparent"
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        style={{ pointerEvents: 'all' }}
      />
      {startPoint && currentPoint && (
        <line
          x1={startPoint.x}
          y1={startPoint.y}
          x2={currentPoint.x}
          y2={currentPoint.y}
          stroke="black"
          strokeWidth={1}
        />
      )}
    </>
  );
}

export default DrawTool;