import React, { useState } from 'react';

function SelectTool({ paths, onUpdatePaths, zoom }) {
  const NODE_RADIUS = 4;
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [selectionBox, setSelectionBox] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

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

  const getArtboardCoordinates = (e) => {
    const svg = e.currentTarget.closest('svg');
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / zoom,
      y: (e.clientY - rect.top) / zoom
    };
  };

  const handleMouseDown = (e) => {
    // Only start selection box if clicking on background
    if (e.target.classList.contains('selection-background')) {
      const point = getArtboardCoordinates(e);
      if (point) {
        setIsDragging(true);
        setSelectionBox({
          startX: point.x,
          startY: point.y,
          endX: point.x,
          endY: point.y
        });
      }
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const point = getArtboardCoordinates(e);
      if (point && selectionBox) {
        setSelectionBox(prev => ({
          ...prev,
          endX: point.x,
          endY: point.y
        }));
      }
    }
  };

  const handleMouseUp = (e) => {
    if (isDragging && selectionBox) {
      const minX = Math.min(selectionBox.startX, selectionBox.endX);
      const maxX = Math.max(selectionBox.startX, selectionBox.endX);
      const minY = Math.min(selectionBox.startY, selectionBox.endY);
      const maxY = Math.max(selectionBox.startY, selectionBox.endY);

      // Update point selection based on box
      onUpdatePaths(paths.map(path => ({
        ...path,
        points: path.points.map(point => ({
          ...point,
          selected: e.shiftKey 
            ? (point.selected || (point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY))
            : (point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY)
        }))
      })));
    }
    setIsDragging(false);
    setSelectionBox(null);
  };

  // Helper to determine if a point should be visible
  const shouldShowPoint = (point, pathId, pointIndex) => {
    return point.selected || 
           (hoveredPoint?.pathId === pathId && hoveredPoint?.pointIndex === pointIndex);
  };

  return (
    <g className="select-tool">
      {/* Background for catching clicks */}
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="transparent"
        className="selection-background"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ pointerEvents: 'all' }}
      />

      {/* Selection box */}
      {selectionBox && (
        <rect
          x={Math.min(selectionBox.startX, selectionBox.endX)}
          y={Math.min(selectionBox.startY, selectionBox.endY)}
          width={Math.abs(selectionBox.endX - selectionBox.startX)}
          height={Math.abs(selectionBox.endY - selectionBox.startY)}
          fill="rgba(74, 144, 226, 0.1)"
          stroke="rgb(74, 144, 226)"
          strokeWidth={1 / zoom}
          style={{ pointerEvents: 'none' }}
        />
      )}
      
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
            style={{ pointerEvents: 'none' }}
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
        </g>
      ))}
    </g>
  );
}

export default SelectTool;