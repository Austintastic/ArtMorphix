import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import '../assets/styles.css';

const ArtSpace = forwardRef(({ artboardSize, zoom, setZoom, onZoomIn, onZoomOut, onFitToView }, ref) => {
  const containerRef = useRef(null);

  const calculateCenter = () => {
    if (!containerRef.current) return { x: 0, y: 0 };
    
    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    
    // Position artboard in center of container
    const centerX = containerWidth / 2 - (artboardSize.width / 2);
    const centerY = containerHeight / 2 - (artboardSize.height / 2);
    
    return { x: centerX, y: centerY };
  };

  const calculateFitToViewZoom = () => {
    if (!containerRef.current) return 1;
    
    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    
    // Calculate zoom ratios for both dimensions
    const widthRatio = (containerWidth - 40) / artboardSize.width;
    const heightRatio = (containerHeight - 40) / artboardSize.height;
    
    // Use the smaller ratio to ensure the artboard fits in both dimensions
    return Math.min(widthRatio, heightRatio);
  };

  useImperativeHandle(ref, () => ({
    calculateFitToViewZoom
  }));

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.metaKey) {
        if (e.key === '=') {
          e.preventDefault();
          const newZoom = zoom + 0.1;
          if (newZoom <= 5) {
            setZoom(newZoom);
          }
        } else if (e.key === '-') {
          e.preventDefault();
          const newZoom = zoom - 0.1;
          if (newZoom >= 0.2) {
            setZoom(newZoom);
          }
        } else if (e.key === '0') {
          e.preventDefault();
          onFitToView();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [zoom, setZoom, onFitToView]);

  return (
    <div 
      ref={containerRef}
      className="artspace"
    >
      <svg
        className="artboard"
        width={artboardSize.width}
        height={artboardSize.height}
        style={{
          transform: `translate(-50%, -50%) scale(${zoom})`,
          transformOrigin: 'center'
        }}
      />
    </div>
  );
});

export default ArtSpace;