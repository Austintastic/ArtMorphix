import React, { useState } from 'react';

function DrawTool({ pan, zoom, onDrawComplete }) {
  const [points, setPoints] = useState([]);
  const [currentPoint, setCurrentPoint] = useState(null);
  const NODE_RADIUS = 4;

  const getArtboardCoordinates = (e) => {
    const svg = e.currentTarget.closest('svg');
    if (!svg) return null;
    
    const point = svg.createSVGPoint();
    point.x = e.clientX;
    point.y = e.clientY;
    
    // Convert screen coordinates to SVG coordinates
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    
    const svgPoint = point.matrixTransform(ctm.inverse());
    return svgPoint;
  };

  const handleClick = (e) => {
    e.stopPropagation();
    const point = getArtboardCoordinates(e);
    if (!point) return;

    if (points.length === 0) {
      // First click - set first point
      setPoints([point]);
      setCurrentPoint(point);
    } else if (points.length === 1) {
      // Second click - complete the line
      const newPoints = [...points, point];
      onDrawComplete(newPoints);
      setPoints([]);
      setCurrentPoint(null);
    }
  };

  const handleMouseMove = (e) => {
    if (points.length === 1) {
      e.stopPropagation();
      const point = getArtboardCoordinates(e);
      if (point) {
        setCurrentPoint(point);
      }
    }
  };

  return (
    <g>
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
      {/* Draw existing point */}
      {points.map((point, index) => (
        <circle
          key={index}
          cx={point.x}
          cy={point.y}
          r={NODE_RADIUS}
          fill="white"
          stroke="black"
          strokeWidth={1}
          style={{ pointerEvents: 'none' }}
        />
      ))}
      {/* Draw current point and preview line */}
      {points.length === 1 && currentPoint && (
        <>
          <line
            x1={points[0].x}
            y1={points[0].y}
            x2={currentPoint.x}
            y2={currentPoint.y}
            stroke="black"
            strokeWidth={1}
            strokeDasharray="4"
            style={{ pointerEvents: 'none' }}
          />
          <circle
            cx={currentPoint.x}
            cy={currentPoint.y}
            r={NODE_RADIUS}
            fill="white"
            stroke="black"
            strokeWidth={1}
            style={{ pointerEvents: 'none' }}
          />
        </>
      )}
    </g>
  );
}

export default DrawTool;