import React from 'react';

function RulersTool({ artboardSize, zoom }) {
  const tickInterval = 50; // pixels between major ticks
  const minorTickInterval = 10; // pixels between minor ticks

  const generateTicks = (length, isHorizontal) => {
    const ticks = [];
    const numTicks = Math.floor(length / minorTickInterval);

    for (let i = 0; i <= numTicks; i++) {
      const position = i * minorTickInterval;
      const isMajor = position % tickInterval === 0;
      
      if (isHorizontal) {
        // Horizontal ruler ticks
        ticks.push(
          <line
            key={`tick-${i}`}
            x1={position}
            y1={isMajor ? 0 : 15}
            x2={position}
            y2={25}
            stroke="black"
            strokeWidth={1 / zoom}
          />
        );
        
        if (isMajor) {
          ticks.push(
            <text
              key={`label-${i}`}
              x={position}
              y={12}
              textAnchor="middle"
              fontSize={`${10 / zoom}px`}
              fill="black"
            >
              {position}
            </text>
          );
        }
      } else {
        // Vertical ruler ticks
        ticks.push(
          <line
            key={`tick-${i}`}
            x1={isMajor ? 0 : 15}
            y1={position}
            x2={25}
            y2={position}
            stroke="black"
            strokeWidth={1 / zoom}
          />
        );
        
        if (isMajor) {
          ticks.push(
            <text
              key={`label-${i}`}
              x={12}
              y={position + 4}
              textAnchor="middle"
              fontSize={`${10 / zoom}px`}
              fill="black"
            >
              {position}
            </text>
          );
        }
      }
    }
    return ticks;
  };

  return (
    <g className="rulers">
      {/* Horizontal ruler */}
      <g className="ruler horizontal">
        <rect
          x="0"
          y="0"
          width={artboardSize.width}
          height="25"
          fill="white"
          stroke="black"
          strokeWidth={1 / zoom}
        />
        {generateTicks(artboardSize.width, true)}
      </g>

      {/* Vertical ruler */}
      <g className="ruler vertical">
        <rect
          x="0"
          y="0"
          width="25"
          height={artboardSize.height}
          fill="white"
          stroke="black"
          strokeWidth={1 / zoom}
        />
        {generateTicks(artboardSize.height, false)}
      </g>

      {/* Corner square */}
      <rect
        x="0"
        y="0"
        width="25"
        height="25"
        fill="white"
        stroke="black"
        strokeWidth={1 / zoom}
      />
    </g>
  );
}

export default RulersTool;