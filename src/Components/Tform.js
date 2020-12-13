import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import TimePicker from './TimePicker';
import SliderScale from './SliderScale';
import LS from '../utils/ls';

const getDefaultValue = (field) => {
  if (field === 'date')
    return new Date().toLocaleDateString();
  else
    return LS.getItem(field) || '';
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

const onSubmit = e => {
  e.preventDefault();
  return new Promise(resolve => {
    LS.items.forEach(({ field }) => {
      const value = (e.target[field].value || '').trim();
      LS.setItem(field, value);
    });
    const valid = LS.isValid();
    if (valid) {
      setTimeout(() => window.scrollTo(0,0), 500);
      resolve(true);
    }
    resolve(false);
  });
}

export default function Tform() {
  const [redirect, setRedirect] = useState(false);

  const submitHandler = (e) => {
    onSubmit(e).then(setRedirect);
  }

  if (redirect) {
    return <Redirect push to="/lift" />;
  }

  const items = LS.isValidUser()
    ? LS.items.map(item =>
        item.field === 'name' || item.field === 'age'
        ? { ...item, type: 'hidden' }
        : item
      )
    : LS.items;

  return (
    <div className="px-4 py-4">
      <div>
        <form onSubmit={submitHandler}>
          {items.map(({ label, field, type, scale }) => {
            return (
              <div key={field} id={`${field}-wrapper`}>
                {type !== 'hidden' && <label htmlFor={field}>{label}</label>}
                {getInput(type, { field, scale })}
              </div>
            );
          })}
          <div className="has-text-centered">
            <input className="button is-black" type="submit" value="Next" />
          </div>
        </form>
      </div>
    </div>
  );
}
