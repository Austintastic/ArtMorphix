import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { MODES } from '../utils/constants';
import DrawTool from './DrawTool';
import SelectTool from './SelectTool';
import RulersTool from './RulersTool';
import '../assets/styles.css';

const ArtSpace = forwardRef(({ 
  artboardSize, 
  zoom, 
  setZoom, 
  onZoomIn, 
  onZoomOut, 
  onFitToView,
  currentMode,
  onModeChange,
  showRulers 
}, ref) => {
  const containerRef = useRef(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [paths, setPaths] = useState([]);

  const handleArtSpaceClick = (e) => {
    // Only handle clicks in SELECT mode and when not panning
    if (currentMode === MODES.SELECT && !isSpacePressed && !isDragging) {
      // If the click is directly on the artspace (not on the SVG), deselect all points
      if (e.target.classList.contains('artspace')) {
        setPaths(prevPaths => prevPaths.map(path => ({
          ...path,
          points: path.points.map(point => ({
            ...point,
            selected: false
          }))
        })));
      }
    }
  };

  // Handle spacebar press/release
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && !isSpacePressed) {
        e.preventDefault(); // Prevent page scroll
        setIsSpacePressed(true);
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'Space') {
        setIsSpacePressed(false);
        setIsDragging(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isSpacePressed]);

  // Handle mouse events for panning
  const handleMouseDown = (e) => {
    if (isSpacePressed) {
      setIsDragging(true);
      setStartPos({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && isSpacePressed) {
      setPan({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y
      });
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

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

  // Scroll handler for panning and zooming
  const handleScroll = (e) => {
    // Only handle scroll if it originated in our container
    if (!containerRef.current?.contains(e.target)) {
      return;
    }
    
    // Prevent the scroll from affecting the page
    e.preventDefault();
    e.stopPropagation();
    
    if (e.metaKey) {
      // Zoom with Command + scroll
      const zoomDelta = -e.deltaY * 0.001; // Adjust this multiplier to control zoom sensitivity
      const newZoom = Math.max(0.2, Math.min(5, zoom + zoomDelta));
      setZoom(newZoom);
    } else {
      // Regular panning without Command key
      const deltaX = e.deltaX;
      const deltaY = e.deltaY;
      
      setPan(prev => ({
        x: prev.x - deltaX,
        y: prev.y - deltaY
      }));
    }
  };

  // Add global wheel event listener
  useEffect(() => {
    const options = { passive: false };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleScroll, options);
      
      return () => {
        container.removeEventListener('wheel', handleScroll, options);
      };
    }
  }, [zoom]); // Added zoom to dependencies since we use it in the handler

  const handleDrawComplete = (points) => {
    if (points.length === 2) {
      setPaths(prev => [...prev, { 
        points: points.map(p => ({ ...p, selected: false })),
        id: Date.now(),
      }]);
      onModeChange(MODES.SELECT);
    }
  };

  // Add effect to deselect points when tool changes
  useEffect(() => {
    // Deselect all points when changing tools
    setPaths(prevPaths => prevPaths.map(path => ({
      ...path,
      points: path.points.map(point => ({
        ...point,
        selected: false
      }))
    })));
  }, [currentMode]);

  return (
    <div 
      ref={containerRef}
      className="artspace"
      onClick={handleArtSpaceClick}
      onMouseDown={isSpacePressed ? handleMouseDown : undefined}
      onMouseMove={isSpacePressed ? handleMouseMove : undefined}
      onMouseUp={isSpacePressed ? handleMouseUp : undefined}
      onMouseLeave={isSpacePressed ? handleMouseUp : undefined}
      style={{ 
        cursor: isSpacePressed ? 'grab' : 
               currentMode === MODES.DRAW ? 'crosshair' : 
               'default' 
      }}
    >
      <svg
        className="artboard"
        width={artboardSize.width}
        height={artboardSize.height}
        style={{
          transform: `translate(calc(-50% + ${pan.x}px), calc(-50% + ${pan.y}px)) scale(${zoom})`,
          transformOrigin: 'center'
        }}
        onMouseDown={e => !isSpacePressed && e.stopPropagation()}
        onMouseMove={e => !isSpacePressed && e.stopPropagation()}
        onMouseUp={e => !isSpacePressed && e.stopPropagation()}
      >
        {/* Background rect to show artboard bounds */}
        <rect
          x="0"
          y="0"
          width={artboardSize.width}
          height={artboardSize.height}
          fill="white"
          stroke="black"
          strokeWidth="1"
        />
        
        {/* Render RulersTool when showRulers is true */}
        {showRulers && (
          <RulersTool
            artboardSize={artboardSize}
            zoom={zoom}
          />
        )}
        
        {/* Always render paths */}
        {currentMode === MODES.SELECT ? (
          <SelectTool
            paths={paths}
            onUpdatePaths={setPaths}
            zoom={zoom}
          />
        ) : (
          /* Render just the lines without points in draw mode */
          <g>
            {paths.map((path) => (
              <line
                key={path.id}
                x1={path.points[0].x}
                y1={path.points[0].y}
                x2={path.points[1].x}
                y2={path.points[1].y}
                stroke="black"
                strokeWidth={1}
              />
            ))}
          </g>
        )}
        
        {/* Render DrawTool when in draw mode */}
        {currentMode === MODES.DRAW && (
          <DrawTool
            pan={pan}
            zoom={zoom}
            onDrawComplete={handleDrawComplete}
          />
        )}
      </svg>
    </div>
  );
});

export default ArtSpace;