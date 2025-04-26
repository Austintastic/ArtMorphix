import React, { useState } from 'react';

function SelectTool({ paths, onUpdatePaths, zoom }) {
  const NODE_RADIUS = 4;
  const [hoveredPathId, setHoveredPathId] = useState(null);

  const handlePointClick = (pathId, pointIndex) => {
    onUpdatePaths(paths.map(path => {
      if (path.id === pathId) {
        const newPoints = path.points.map((point, idx) => ({
          ...point,
          selected: idx === pointIndex ? !point.selected : point.selected
        }));
        return { ...path, points: newPoints };
      }
      return path;
    }));
  };

  return (
    <g className="select-tool">
      {paths.map((path) => {
        const hasSelectedPoints = path.points.some(point => point.selected);
        const isHovered = hoveredPathId === path.id;
        const showPoints = hasSelectedPoints || isHovered;

        return (
          <g 
            key={path.id}
            onMouseEnter={() => setHoveredPathId(path.id)}
            onMouseLeave={() => setHoveredPathId(null)}
          >
            {/* Render the main line with a larger hit area for hover */}
            <line
              x1={path.points[0].x}
              y1={path.points[0].y}
              x2={path.points[1].x}
              y2={path.points[1].y}
              stroke="black"
              strokeWidth={1 / zoom}
            />
            <line
              x1={path.points[0].x}
              y1={path.points[0].y}
              x2={path.points[1].x}
              y2={path.points[1].y}
              stroke="transparent"
              strokeWidth={(NODE_RADIUS * 2) / zoom}
              style={{ cursor: "pointer" }}
            />
            
            {/* Render points only when path is hovered or has selected points */}
            {showPoints && path.points.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r={NODE_RADIUS / zoom}
                fill={point.selected ? "#4a90e2" : "white"}
                stroke="black"
                strokeWidth={1 / zoom}
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePointClick(path.id, index);
                }}
              />
            ))}
          </g>
        );
      })}
    </g>
  );
}

export default SelectTool;