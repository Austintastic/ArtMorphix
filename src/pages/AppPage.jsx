import React, { useState } from 'react';
import Toolbar from '../components/Toolbar.jsx';
import ArtSpace from '../components/ArtSpace.jsx';
import PropertiesPanel from '../components/PropertiesPanel.jsx';
import '../assets/styles.css';

function AppPage() {
  const [styles, setStyles] = useState({ stroke: '#000000', fill: 'none', strokeWidth: 1 });
  const [artboardSize, setArtboardSize] = useState({ width: 800, height: 600 });
  const [selected, setSelected] = useState(null);

  const handleSelectArtSpace = () => {
    setSelected((prev) => (prev === 'artspace' ? null : 'artspace'));
  };

  const handleZoomIn = () => {
    // Optional: Add any logic needed when zooming in
  };

  const handleZoomOut = () => {
    // Optional: Add any logic needed when zooming out
  };

  return (
    <div className="app-container">
      <div className="toolbar-wrap">
        <Toolbar
          onSelectArtSpace={handleSelectArtSpace}
          selected={selected}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
        />
      </div>
      <div className="artspace-wrap">
        <ArtSpace
          artboardSize={artboardSize}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
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