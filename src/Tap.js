import React, { useState, useEffect } from 'react';
import './Tap.css';

const DELAY = 1500;

const interval = (t1, t2) => t2 - t1;

function Results({ clicks, reset }) {
  const results = [{
    item: 'Date',
    value: new Date(clicks[0]).toLocaleDateString()
  },
  {
    item: 'Time',
    value: new Date(clicks[0]).toLocaleTimeString()
  }];
  const intervals = [];
  ['2-Tap Int 1','3-Tap Int 1','3-Tap Int 2','4-Tap Int 1','4-Tap Int 2','4-Tap Int 3'].forEach((item, i) => {
    const use = i === 0
      ? [1, 2] : i < 3
      ? [i+2, i+3]
      : [i+3, i+4];
    const int = interval(clicks[use[0]], clicks[use[1]]);
    results.push({
      item,
      value: `${int}ms`
    });
    intervals.push(int);
  });
  results.push({
    item: 'Average',
    value: `${Math.round(intervals.reduce((a, c) => a+c, 0) / intervals.length)}ms`
  })
  return (
    <div className="overlay">
      <div className="modal">
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {results.map(r => (
              <tr key={r.item}>
                <td>{r.item}</td>
                <td>{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="reset" onClick={reset}>Restart</div>
      </div>
    </div>
  );
}

function Tap() {
  const [ctext, setCtext] = useState('Start');
  const [clicks, setClicks] = useState([]);
  const [active, setActive] = useState(false);
  const [res, setRes] = useState(false);

  const update = (ctext, active) => {
    setCtext(ctext);
    setActive(active);
  }

  const reset = () => {
    setClicks([]);
    update('Start', false);
    setRes(false);
  }

  useEffect(() => {
    switch(clicks.length) {
      case 1: {
        setTimeout(() => {
          update('2', true);
        }, 500);
        break;
      }
      case 3: {
        update('Good', false);
        setTimeout(() => {
          update('3', true);
        }, DELAY);
        break;
      }
      case 6: {
        update('Good', false);
        setTimeout(() => {
          update('4', true);
        }, DELAY);
        break;
      }
      case 10: {
        update('Done', false);
        setTimeout(() => {
          setRes(true);
        }, DELAY);
        break;
      }
      default: break;
    }
  }, [clicks]);

  const click = e => {
    if (clicks.length === 0) {
      setCtext('');
    } else if (!active) {
      return;
    }
    setClicks([...clicks, Date.now()]);
  }

  return (
    <>
      <div className="header">
        Tap Start.  When a number appears, tap the circle that many times as quickly as you can.  Use only your thumb.
      </div>
      <div className="tap">
        <div
          className={`circle ${active && 'active'}`}
          onClick={click}
        >
          {ctext}
        </div>
      </div>
      {res && <Results clicks={clicks} reset={reset} />}
    </>
  );
}

export default Tap;
