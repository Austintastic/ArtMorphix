import React from 'react';

function Toolbar({ onSelectArtSpace, selected, onZoomIn, onZoomOut, onFitToView }) {
  return (
    <div className="toolbar">
      <button
        className={selected === 'artspace' ? 'active' : ''}
        onClick={onSelectArtSpace}
      >ArtBoard</button>
    </div>
  );
}

export default Toolbar;