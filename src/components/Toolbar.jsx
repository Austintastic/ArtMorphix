
import React from 'react';

function Toolbar({ onSelectArtSpace, selected, onZoomIn, onZoomOut }) {
  return (
    <div className="toolbar">
      <button
        className={selected === 'artspace' ? 'active' : ''}
        onClick={onSelectArtSpace}
      >ArtBoard</button>
      <button onClick={onZoomIn}>Zoom In</button>
      <button onClick={onZoomOut}>Zoom Out</button>
    </div>
  );
}

export default Toolbar;