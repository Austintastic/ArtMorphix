import React, { useState } from 'react';

function SelectTool({ paths, onUpdatePaths, zoom }) {
  const NODE_RADIUS = 4;
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const handlePointClick = (e, pathId, pointIndex) => {
    e.stopPropagation();
    const shiftKey = e.shiftKey;

    onUpdatePaths(paths.map(path => ({
      ...path,
      points: path.points.map((point, idx) => ({
        ...point,
        selected: path.id === pathId && idx === pointIndex
          ? shiftKey 
            ? !point.selected // Toggle only this point if shift is pressed
            : true // Select only this point if shift is not pressed
          : shiftKey
            ? point.selected // Keep other points' selection state if shift is pressed
            : false // Deselect all others if shift is not pressed
      }))
    })));
  };

  const handleArtSpaceClick = (e) => {
    // Deselect all points only when clicking directly on the artspace background
    if (e.target.classList.contains('artspace-background')) {
      onUpdatePaths(paths.map(path => ({
        ...path,
        points: path.points.map(point => ({
          ...point,
          selected: false
        }))
      })));
    }
  };

  // Helper to determine if a point should be visible
  const shouldShowPoint = (point, pathId, pointIndex) => {
    return point.selected || 
           (hoveredPoint?.pathId === pathId && hoveredPoint?.pointIndex === pointIndex);
  };

  return (
    <g className="select-tool" style={{ cursor: 'default' }}>
      {/* Transparent background to catch clicks */}
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="transparent"
        className="artspace-background"
        onClick={handleArtSpaceClick}
        style={{ pointerEvents: 'all' }}
      />
      
      {paths.map((path) => (
        <g key={path.id}>
          {/* Main line */}
          <line
            x1={path.points[0].x}
            y1={path.points[0].y}
            x2={path.points[1].x}
            y2={path.points[1].y}
            stroke="black"
            strokeWidth={1 / zoom}
          />
          
          {/* Points */}
          {path.points.map((point, index) => (
            <g key={index}>
              {/* Larger hit area for hover detection */}
              <circle
                cx={point.x}
                cy={point.y}
                r={(NODE_RADIUS * 2) / zoom}
                fill="transparent"
                style={{ 
                  cursor: 'pointer',
                  pointerEvents: 'all'
                }}
                onMouseEnter={() => setHoveredPoint({ pathId: path.id, pointIndex: index })}
                onMouseLeave={() => setHoveredPoint(null)}
                onClick={(e) => handlePointClick(e, path.id, index)}
              />
              {/* Visible point */}
              <circle
                cx={point.x}
                cy={point.y}
                r={NODE_RADIUS / zoom}
                fill={point.selected ? "#4a90e2" : "white"}
                stroke="black"
                strokeWidth={1 / zoom}
                style={{ 
                  opacity: shouldShowPoint(point, path.id, index) ? 1 : 0,
                  pointerEvents: 'none'
                }}
              />
            </g>
          ))}
          
          {/* Line hit area (only for hover detection) */}
          <line
            x1={path.points[0].x}
            y1={path.points[0].y}
            x2={path.points[1].x}
            y2={path.points[1].y}
            stroke="transparent"
            strokeWidth={(NODE_RADIUS * 2) / zoom}
            style={{ 
              cursor: 'pointer',
              pointerEvents: 'all'
            }}
          />
        </g>
      ))}
    </g>
  );
}

export default SelectTool;