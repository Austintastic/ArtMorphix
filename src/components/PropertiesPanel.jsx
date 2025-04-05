import React from 'react';

function PropertiesPanel({ onUpdate, selected, artboardSize, setArtboardSize }) {
  const handleSizeChange = (e) => {
    const { name, value } = e.target;
    setArtboardSize((prev) => ({ ...prev, [name]: parseInt(value) }));
  };

  return (
    <div>
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
  );
}

export default PropertiesPanel;