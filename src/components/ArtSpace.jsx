import React, { useState, useEffect } from 'react';
import '../assets/styles.css';

function ArtSpace({ artboardSize, zoom, setZoom, onZoomIn, onZoomOut }) {
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (zoom === 1) {
      setPan({ x: 0, y: 0 });
    }
  }, [zoom]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPan({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomSpeed = 0.1;
    const newZoom = zoom + (e.deltaY < 0 ? zoomSpeed : -zoomSpeed);
    if (newZoom >= 0.2 && newZoom <= 5) {
      setZoom(newZoom);
    }
  };

  return (
    <div className="artspace" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      <svg
        className="artboard"
        width={artboardSize.width}
        height={artboardSize.height}
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: 'center',
        }}
      />
    </div>
  );
}

export default ArtSpace;