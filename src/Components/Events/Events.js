import React, { useState } from 'react';
import noop from 'lodash/noop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const YEAR = new Date().getFullYear();
const YEARS = [];
for (let i = YEAR; i < YEAR + 5; i += 1) {
  YEARS.push(i);
}
const MONTHS = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];
const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const DAYS = [];
for (let i = 1; i < 32; i += 1) {
  DAYS.push(i < 10 ? `0${i}` : String(i));
}

const translateDate = (date) => {
  const [y, m, d] = date.split('-').map(Number);
  return `${d} ${MONTH_NAMES[m - 1]} ${y}`;
};

function Events({ events, setEvents, updateHiitrx }) {
  const [month, setMonth] = useState('01');
  const [day, setDay] = useState('01');
  const [year, setYear] = useState(YEAR);

  const addEvent = () => {
    setEvents([...events, `${year}-${month}-${day}`].sort());
    updateHiitrx().then(noop).catch(noop);
  };
  const removeEvent = (idx) => {
    const left = [...events];
    left.splice(idx, 1);
    setEvents(left);
    updateHiitrx().then(noop).catch(noop);
  };

  return (
    <>
      <div className="table m-4">
        <div className="headings columns is-mobile">
          <div className="column is-12">My Competitions</div>
        </div>
        {!events.length && <div>Nothing scheduled</div>}
        {events.map((date, idx) => (
          <div
            key={`${date}-${idx}`}
            className={`columns is-mobile ${
              idx % 2 ? 'has-background-white-ter' : ''
            }`}
          >
            <div className="column is-10 is-flex is-align-items-center">
              {translateDate(date)}
            </div>
            <div className="column is-2 has-text-centered">
              <button className="button" onClick={() => removeEvent(idx)}>
                <FontAwesomeIcon className="has-text-danger" icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="is-flex is-justify-content-space-between fixed-button">
        <div className="select mr-1">
          <select onChange={(e) => setDay(e.target.value)} value={day}>
            {DAYS.map((dy) => (
              <option key={`dy-${dy}`} value={dy}>
                {dy}
              </option>
            ))}
          </select>
        </div>
        <div className="select mr-1">
          <select onChange={(e) => setMonth(e.target.value)} value={month}>
            {MONTH_NAMES.map((mo, idx) => (
              <option key={mo} value={MONTHS[idx]}>
                {mo}
              </option>
            ))}
          </select>
        </div>
        <div className="select mr-1">
          <select onChange={(e) => setYear(e.target.value)} value={year}>
            {YEARS.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>
        <button className="button is-black" onClick={addEvent}>
          Add
        </button>
      </div>
    </>
  );
}

export default Events;
