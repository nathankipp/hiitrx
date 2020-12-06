import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import LS from './ls';

// const days = [
//   'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
// ];

const getDefaultValue = (field) => {
  if (field === 'date')
    return new Date().toLocaleDateString();
  else
    return LS.getItem(field) || '';
}

const SCALE = ['Less', 'Normal', 'More'];
const SliderScale = ({ scale = SCALE }) => (
  <div className="slider-scale mb-4">
    {scale.map(tick => <div key={tick}>{tick}</div>)}
  </div>
);

const TimePicker = ({ h, m }) => {
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

const getInput = (type, { field, scale }) => {
  switch (type) {
    case 'slider':
      return (
        <>
          <input
            id={field}
            name={field}
            defaultValue={getDefaultValue(field)}
            className="slider is-warning is-fullwidth is-large mt-2"
            step=".25"
            min="0"
            max="10"
            type="range"/>
          <SliderScale scale={scale} />
        </>
      );
    case 'time':
      const time = getDefaultValue(field);
      let [h, m] = time.split('.');
      h = h || 8;
      m = m || 0;
      return <TimePicker h={Number(h)} m={Number(`.${m}`)*60} />;
    case 'text':
    default:
      return (
        <input
          className="input mb-4"
          id={field}
          name={field}
          defaultValue={getDefaultValue(field)}
          type={type || 'text'}/>
      );
  }
}

export default function Tform({ onSubmit }) {
  const [redirect, setRedirect] = useState(false);

  const submitHandler = (e) => {
    onSubmit(e).then(setRedirect);
  }

  if (redirect) {
    return <Redirect to="/lift" />;
  }

  return (
    <div className="px-4 py-4">
      <div>
        <form onSubmit={submitHandler}>
          {LS.items.map(({ label, field, type, scale }) => (
            <div key={field} id={`${field}-wrapper`}>
              {type !== 'hidden' && <label htmlFor={field}>{label}</label>}
              {getInput(type, { field, scale })}
            </div>
          ))}
          <div className="has-text-centered">
            <input className="button is-black" type="submit" value="Next" />
          </div>
        </form>
      </div>
    </div>
  );
}
// {
//   LS.items.map(({ field }) =>
//   <div key={field}>{field}: {LS.getItem(field)}</div>
// )
// }
