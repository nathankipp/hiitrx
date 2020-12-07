import React, { useState } from 'react';
import SliderScale from './SliderScale';

export default function TimePicker({ h, m }) {
  const [hours, setHours] = useState(h);
  const [minutes, setMinutes] = useState(m);

  const adjust = which => amount => e => {
    e.preventDefault();
    if (which === 'h') {
      const value = hours + amount;
      if (value >= 0 && value < 25) {
        setHours(hours + amount);
      }
    } else {
      const value = minutes + amount;
      if (value >= 0 && value < 60) {
        setMinutes(minutes + amount);
      }
    }
  }

  return (
    <>
      <div className="time-picker mt-4 mb-4">
        <div>
          <button onClick={adjust('h')(-1)} className="button mr-4">-</button>
          <button onClick={adjust('h')(1)} className="button">+</button>
        </div>
        <div>{hours} hrs {minutes} min</div>
        <div>
          <button onClick={adjust('m')(-15)} className="button mr-4">-</button>
          <button onClick={adjust('m')(15)} className="button">+</button>
        </div>
      </div>
      <SliderScale scale={['subtract/add hours', 'subtract/add minutes']} />
      <input type="hidden" name="sleepHours" defaultValue={`${hours + minutes/60}`} />
    </>
  );
}
