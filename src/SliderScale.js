import React from 'react';

const SCALE = ['Less', 'Normal', 'More'];

export default function SliderScale({ scale = SCALE }) {
  return (
    <div className="slider-scale mb-4">
      {scale.map(tick => <div key={tick}>{tick}</div>)}
    </div>
  );
}
