import React, { useState } from 'react';
import Toolbar from '../components/Toolbar.jsx';
import PropertiesPanel from '../components/PropertiesPanel.jsx';
import '../assets/styles.css';

function AppPage() {
  const [styles, setStyles] = useState({ stroke: '#000000', fill: 'none', strokeWidth: 1 });
  const [artboardSize, setArtboardSize] = useState({ width: 800, height: 600 });
  const [selected, setSelected] = useState(null);

  const handleSelectArtSpace = () => {
    setSelected((prev) => (prev === 'artspace' ? null : 'artspace'));
  };

  return (
    <div className="app-container">
      <Toolbar onSelectArtSpace={handleSelectArtSpace} selected={selected} />
      <div className="artspace">
        <svg className="artboard" width={artboardSize.width} height={artboardSize.height}>
          <rect
            x="0"
            y="0"
            width={artboardSize.width}
            height={artboardSize.height}
            fill="white"
            stroke="black"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="properties">
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