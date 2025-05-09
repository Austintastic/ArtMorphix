import React from 'react';
import { MODES, MODE_ICONS } from '../utils/constants';

function Toolbar({ onSelectArtSpace, selected, currentMode, onModeChange, showRulers }) {
  return (
    <div className="toolbar">
      <button
        className={currentMode === MODES.SELECT ? 'active' : ''}
        onClick={() => onModeChange(MODES.SELECT)}
      >
        {MODE_ICONS[MODES.SELECT]} Select
      </button>
      <button
        className={currentMode === MODES.DRAW ? 'active' : ''}
        onClick={() => onModeChange(MODES.DRAW)}
      >
        {MODE_ICONS[MODES.DRAW]} Draw
      </button>
      <button
        className={showRulers ? 'active' : ''}
        onClick={() => onModeChange(MODES.RULERS)}
      >
        {MODE_ICONS[MODES.RULERS]} Rulers
      </button>
      <button
        className={selected === 'artspace' ? 'active' : ''}
        onClick={onSelectArtSpace}
      >
        ArtBoard
      </button>
    </div>
  );
}

export default Toolbar;