import React from 'react';

function Toolbar({ onSelectArtSpace, selected, onZoomIn, onZoomOut, onFitToView }) {
  return (
    <div className="toolbar">
      <button
        className={selected === 'artspace' ? 'active' : ''}
        onClick={onSelectArtSpace}
      >ArtBoard</button>
      <button onClick={onZoomIn}>Zoom In</button>
      <button onClick={onZoomOut}>Zoom Out</button>
      <button onClick={onFitToView}>Fit to View</button>
    </div>
  );
}

export default Toolbar;