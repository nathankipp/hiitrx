import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './Tform.scss';
import LS from './ls';

const days = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const getDefaultValue = (field) => {
  if (field === 'date')
    return new Date().toLocaleDateString();
  else
    return LS.getItem(field) || '';
}

export default function Tform({ onSubmit }) {
  const [redirect, setRedirect] = useState(false);

  const submitHandler = (e) => {
    const redir = onSubmit(e);
    setRedirect(redir);
  }

  if (redirect) {
    return <Redirect to="/lift" />;
  }

  return (
    <>
      <div className="header">
        My {days[new Date().getDay()]} Status
      </div>
      <div className="form">
        <form onSubmit={submitHandler}>
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
      </div>
    </>
  );
}
// {
//   LS.items.map(({ field }) =>
//   <div key={field}>{field}: {LS.getItem(field)}</div>
// )
// }
