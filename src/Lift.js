import React, { useState, useEffect } from 'react';
import './Lift.css';

const DEFAULTS = {
  ctext: 'Press',
}
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
  for (let i = 0; i < 5; i += 1) {
    const index = i * 2;
    const int = interval(clicks[index], clicks[index+1]);
    results.push({
      item: `Delay ${i+1}`,
      value: `${int}ms`
    });
    intervals.push(int);
  }
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

function Lift() {
  const [ctext, setCtext] = useState(DEFAULTS.ctext);
  const [clicks, setClicks] = useState([]);
  const [active, setActive] = useState(false);
  const [res, setRes] = useState(false);

  const [pressed, setPressed] = useState(false);
  const [triggered, setTriggered] = useState(false);
  let liftTimer;

  const update = (ctext, active) => {
    setCtext(ctext);
    setActive(active);
  }

  const reset = () => {
    setClicks([]);
    update(DEFAULTS.ctext, false);
    setRes(false);
  }

  useEffect(() => {
    const rand = (1 * DELAY) + Math.round(Math.random() * 250);
    if (pressed) {
      liftTimer = setTimeout(() => {
        setTriggered(true);
        setClicks([
          ...clicks,
          Date.now(),
        ]);
      }, rand);
    }
  }, [pressed]);

  useEffect(() => {
    if (clicks.length === 10) {
      setRes(true);
    }
  }, [clicks]);

  const pointerDown = (e) => {
    if (ctext !== DEFAULTS.ctext) {
      return;
    }
    setActive(true);
    setPressed(true);
    console.log(e);
  }

  const pointerUp = (e) => {
    setPressed(false);
    if (!active || ctext !== DEFAULTS.ctext) {
      return;
    }
    if (!triggered) {
      setCtext('!');
      clearTimeout(liftTimer);
    } else {
      setCtext('Good');
      setClicks([
        ...clicks,
        Date.now(),
      ]);
    }
    setActive(false);
    setTriggered(false);
    setTimeout(() => setCtext(DEFAULTS.ctext), DELAY);
    console.log(e);
  }

  return (
    <div className="Lift">
      <div className="header">
        Press with your thumb.
        When the screen turns red, lift your thumb.
        Repeat five times.
      </div>
      <div className={`tap ${pressed && 'pressed'} ${triggered && 'triggered'}`}>
        <div
          className="circle"
          onPointerDown={pointerDown}
          onPointerUp={pointerUp}
        >
          {ctext}
        </div>
      </div>
      {res && <Results clicks={clicks} reset={reset} />}
    </div>
  );
}

export default Lift;
