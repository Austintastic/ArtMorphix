import React from 'react';

function PropertiesPanel({ onUpdate, selected, artboardSize, setArtboardSize, zoom, onZoomIn, onZoomOut, onFitToView }) {
  const handleSizeChange = (e) => {
    const { name, value } = e.target;
    setArtboardSize((prev) => ({ ...prev, [name]: parseInt(value) }));
  };

  return (
    <div className="properties-panel">
      <div className="properties-content">
        {selected === 'artspace' ? (
          <div>
            <h3>ArtBoard</h3>
            <label>
              Width:
              <input
                type="number"
                name="width"
                value={artboardSize.width}
                onChange={handleSizeChange}
              />
            </label>
            <label>
              Height:
              <input
                type="number"
                name="height"
                value={artboardSize.height}
                onChange={handleSizeChange}
              />
            </label>
          </div>
        ) : null}
      </div>
      <div className="zoom-controls">
        <div className="zoom-level-control">
          <button onClick={onZoomOut} className="zoom-button">−</button>
          <div className="zoom-level">{(zoom * 100).toFixed(0)}%</div>
          <button onClick={onZoomIn} className="zoom-button">+</button>
        </div>
        <button onClick={onFitToView} className="fit-button">FIT</button>
      </div>
    </div>
  );
}

export default PropertiesPanel;