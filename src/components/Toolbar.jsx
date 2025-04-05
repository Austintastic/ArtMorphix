import React from 'react';

function Toolbar({ onSelectArtSpace, selected }) {
  return (
    <div className="toolbar">
      <button
        className={selected === 'artspace' ? 'active' : ''}
        onClick={onSelectArtSpace}
      >
        ArtSpace
      </button>
    </div>
  );
}

export default Toolbar;