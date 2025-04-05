// This is the main application page that contains the toolbar, canbas, and properties panel. It also renders the main layout.

import React, { useState } from 'react';
import PathTool from '../components/PathTool';
import PropertiesPanel from '../components/PropertiesPanel';
import '../assets/styles.css';

function AppPage() {
  const [pathData, setPathData] = useState('');
  const [styles, setStyles] = useState({ stroke: '#000000', fill: 'none', strokeWidth: 1 });

  const handleDraw = (points) => {
    if (points.length > 1) {
      const d = `M ${points[0].x},${points[0].y} ` + points.slice(1).map(p => `L ${p.x},${p.y}`).join(' ');
      setPathData(d);
    }
  };

  return (
    <div className="app-container">
      <div className="toolbar">Toolbar</div>
      <div className="canvas">
        <svg width="800" height="800" style={{ border: '1px solid black' }}>
          {pathData && <path d={pathData} fill={styles.fill} stroke={styles.stroke} strokeWidth={styles.strokeWidth} />}
        </svg>
        <PathTool onDraw={handleDraw} />
      </div>
      <div className="properties">
        <PropertiesPanel onUpdate={setStyles} />
      </div>
    </div>
  );
}

export default AppPage;