import React, { useState } from 'react';

function PropertiesPanel({ onUpdate }) {
  const [stroke, setStroke] = useState('#000000');
  const [fill, setFill] = useState('none');
  const [strokeWidth, setStrokeWidth] = useState(1);

  const handleChange = () => {
    onUpdate({ stroke, fill, strokeWidth });
  };

  return (
    <div>
      <label>
        Stroke:
        <input type="color" value={stroke} onChange={(e) => { setStroke(e.target.value); handleChange(); }} />
      </label>
      <label>
        Fill:
        <input type="color" value={fill} onChange={(e) => { setFill(e.target.value); handleChange(); }} />
      </label>
      <label>
        Stroke Width:
        <input type="number" value={strokeWidth} onChange={(e) => { setStrokeWidth(e.target.value); handleChange(); }} />
      </label>
    </div>
  );
}

export default PropertiesPanel;