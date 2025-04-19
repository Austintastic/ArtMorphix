import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import '../assets/styles.css';

const ArtSpace = forwardRef(({ artboardSize, zoom, setZoom, onZoomIn, onZoomOut, onFitToView }, ref) => {
  const containerRef = useRef(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });

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
    const newZoom = Math.min(widthRatio, heightRatio);
    
    // Reset pan when fitting to view
    setPan({ x: 0, y: 0 });
    
    return newZoom;
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

  // Scroll handler for panning
  const handleScroll = (e) => {
    // Only handle scroll if it originated in our container
    if (!containerRef.current?.contains(e.target)) {
      return;
    }
    
    // Prevent the scroll from affecting the page
    e.preventDefault();
    e.stopPropagation();
    
    // Get scroll deltas
    const deltaX = e.deltaX;
    const deltaY = e.deltaY;
    
    // Update pan position based on scroll
    setPan(prev => ({
      x: prev.x - deltaX,
      y: prev.y - deltaY
    }));
  };

  // Add global wheel event listener
  useEffect(() => {
    // Using passive: false to allow preventDefault()
    const options = { passive: false };
    
    // Add wheel event listener to the container
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleScroll, options);
      
      return () => {
        container.removeEventListener('wheel', handleScroll, options);
      };
    }
  }, []);

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
          transform: `translate(calc(-50% + ${pan.x}px), calc(-50% + ${pan.y}px)) scale(${zoom})`,
          transformOrigin: 'center'
        }}
      />
    </div>
  );
});

export default ArtSpace;