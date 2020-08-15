import React from 'react';
import './Tform.scss';
import LS from './ls';

const days = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const onSubmit = e => {
  e.preventDefault();
  let ok = true;
  LS.items.forEach(({ field }) => {
    const value = (e.target[field].value || '').trim();
    console.log(field, value);
    if (value) {
      LS.setItem(field, value);
    }
  });
  LS.isValid()
    ? window.location.assign('#lift')
    : window.location.reload(true);
  setTimeout(() => window.scrollTo(0,0), 500);
}

const getDefaultValue = (field) => {
  if (field === 'date')
    return new Date().toLocaleDateString();
  else
    return LS.getItem(field) || '';
}

export default function Tform() {
  return (
    <>
      <div className="header">
        My {days[new Date().getDay()]} Status
      </div>
      <form onSubmit={onSubmit}>
        {LS.items.map(({ label, field, type }) => (
          <div key={field}>
            {type !== 'hidden' && <label htmlFor={label}>{field}</label>}
            <input
              name={field}
              defaultValue={getDefaultValue(field)}
              type={type || 'text'}
            />
          </div>
        ))}
        <div>
          <input type="submit" value="Continue" />
        </div>
      </form>
    </>
  );
}
// {
//   LS.items.map(({ field }) =>
//   <div key={field}>{field}: {LS.getItem(field)}</div>
// )
// }
