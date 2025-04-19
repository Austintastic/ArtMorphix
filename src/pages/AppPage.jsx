import React, { useState, useRef } from 'react';
import Toolbar from '../components/Toolbar.jsx';
import ArtSpace from '../components/ArtSpace.jsx';
import PropertiesPanel from '../components/PropertiesPanel.jsx';
import '../assets/styles.css';

function AppPage() {
  const [styles, setStyles] = useState({ stroke: '#000000', fill: 'none', strokeWidth: 1 });
  const [artboardSize, setArtboardSize] = useState({ width: 800, height: 600 });
  const [selected, setSelected] = useState(null);
  const [zoom, setZoom] = useState(1);
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

  return (
    <div className="app-container">
      <div className="toolbar-wrap">
        <Toolbar
          onSelectArtSpace={handleSelectArtSpace}
          selected={selected}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onFitToView={handleFitToView}
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
        />
      </div>
      <div className="properties-wrap">
        <PropertiesPanel
          onUpdate={setStyles}
          selected={selected}
          artboardSize={artboardSize}
          setArtboardSize={setArtboardSize}
        />
      </div>
    </div>
  );
}

export default AppPage;