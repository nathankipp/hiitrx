import React, { useState } from "react";
import SliderScale from "../SliderScale";

export default function TimePicker({ h, m, onChange, disabled }) {
  const [hours, setHours] = useState(h);
  const [minutes, setMinutes] = useState(m);

  const adjust = (which) => (amount) => (e) => {
    e.preventDefault();

    let newHours = hours;
    let newMinutes = minutes;
    if (which === "h") {
      if ((amount === 1 && hours < 23) || (amount === -1 && hours > 0)) {
        newHours += amount;
      }
    } else {
      if ((amount === 15 && minutes < 45) || (amount === -15 && minutes > 0)) {
        newMinutes += amount;
      }
    }
    setHours(newHours);
    setMinutes(newMinutes);

    if (newHours !== hours || newMinutes !== minutes) {
      onChange({ target: { value: `${newHours + newMinutes / 60}` } });
    }
  };

  return (
    <>
      <div className="time-picker mt-4 mb-4">
        <div>
          <button
            onClick={adjust("h")(-1)}
            className="button mr-4"
            disabled={disabled}
          >
            -
          </button>
          <button
            onClick={adjust("h")(1)}
            className="button"
            disabled={disabled}
          >
            +
          </button>
        </div>
        <div className="has-text-centered">
          Sleep duration
          <br />
          <pre className="p-0 has-background-white">
            {hours} hrs {minutes} min
          </pre>
        </div>
        <div>
          <button
            onClick={adjust("m")(-15)}
            className="button mr-4"
            disabled={disabled}
          >
            -
          </button>
          <button
            onClick={adjust("m")(15)}
            className="button"
            disabled={disabled}
          >
            +
          </button>
        </div>
      </div>
      <SliderScale scale={["subtract/add hours", "subtract/add minutes"]} />
    </>
  );
}
