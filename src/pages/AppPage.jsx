import React, { useState, useRef, useEffect } from 'react';
import Toolbar from '../components/Toolbar.jsx';
import ArtSpace from '../components/ArtSpace.jsx';
import PropertiesPanel from '../components/PropertiesPanel.jsx';
import { MODES } from '../utils/constants';
import '../assets/styles.css';

function AppPage() {
  const [styles, setStyles] = useState({ stroke: '#000000', fill: 'none', strokeWidth: 1 });
  const [artboardSize, setArtboardSize] = useState({ width: 800, height: 600 });
  const [selected, setSelected] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [currentMode, setCurrentMode] = useState(MODES.SELECT);
  const artSpaceRef = useRef(null);

  const handleSelectArtSpace = () => {
    setSelected((prev) => (prev === 'artspace' ? null : 'artspace'));
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 5));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.2));
  };

  const handleFitToView = () => {
    if (artSpaceRef.current?.calculateFitToViewZoom) {
      const newZoom = artSpaceRef.current.calculateFitToViewZoom();
      setZoom(newZoom);
    }
  };

  const handleModeChange = (mode) => {
    setCurrentMode(mode);
  };

  // Add keyboard shortcut handler
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only handle key if not in an input field
      if (e.target.tagName === 'INPUT') return;
      
      if (e.key === 'v') {
        setCurrentMode(MODES.SELECT);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, []);

  return (
    <div className="app-container">
      <div className="toolbar-wrap">
        <Toolbar
          onSelectArtSpace={handleSelectArtSpace}
          selected={selected}
          currentMode={currentMode}
          onModeChange={handleModeChange}
        />
      </div>
      <div className="artspace-wrap">
        <ArtSpace
          ref={artSpaceRef}
          artboardSize={artboardSize}
          zoom={zoom}
          setZoom={setZoom}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onFitToView={handleFitToView}
          currentMode={currentMode}
          onModeChange={handleModeChange}
        />
      </div>
      <div className="properties-wrap">
        <PropertiesPanel
          onUpdate={setStyles}
          selected={selected}
          artboardSize={artboardSize}
          setArtboardSize={setArtboardSize}
          zoom={zoom}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onFitToView={handleFitToView}
        />
      </div>
    </div>
  );
}

export default AppPage;