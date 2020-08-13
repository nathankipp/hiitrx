import React, { useState, useRef, useEffect } from 'react';
import Pressure from 'pressure';
import './Lift.css';
import { liftItem } from './items';
import { putItemInTable } from './db';

const DEFAULTS = {
  ctext: 'Press',
}
const DELAY = 1500;
const SAMPLE_SIZE = 5;

const interval = (t1, t2) => t2 - t1;

function Results({ clicks, reset }) {
  const results = [{
    item: 'Date',
    value: new Date(clicks[0].timeStamp).toLocaleDateString()
  },
  {
    item: 'Time',
    value: new Date(clicks[0].timeStamp).toLocaleTimeString()
  }];
  const intervals = [];
  for (let i = 0; i < SAMPLE_SIZE; i += 1) {
    const index = i * 2;
    const int = interval(clicks[index].timeStamp, clicks[index+1].timeStamp);
    const press = Math.round(clicks[index+1].pressure * 1000)/10;
    results.push({
      item: `Delay ${i+1}`,
      value: `${int}ms [${press}%]`
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
  const liftTimer = useRef(null);
  const maxForce = useRef(0);

  useEffect(() => {
    Pressure.set('#circle', {
      start: () => {
        maxForce.current = 0;
      },
      change: force => {
        maxForce.current = force > maxForce.current ? force : maxForce.current;
      },
      unsupported: function(){
        maxForce.current = -1;
      },
    }, {
      only: 'touch',
      polyfill: false,
    });
  }, []);

  const update = (ctext, active) => {
    setCtext(ctext);
    setActive(active);
  }

  const save = () => {
    const items = [];
    const timeStamp = Date.now();
    for (let i = 0; i < clicks.length; i += 2) {
      items.push(new Promise((resolve, reject) => {
        const item = liftItem({
            timeStamp,
            trigger: clicks[i].timeStamp,
            lift: clicks[i+1].timeStamp,
            pressure: clicks[i+1].pressure,
          });
        putItemInTable(item, 'lift').then(resolve).catch(reject);
      }));
    }
    return Promise.all(items);
  }

  const reset = () => {
    save().finally(() => {
      setRes(false);
      setClicks([]);
      update(DEFAULTS.ctext, false);
    });
  }

  useEffect(() => {
    const rand = DELAY + Math.round(Math.random() * 250);
    if (pressed) {
      liftTimer.current = setTimeout(() => {
        setTriggered(true);
        setClicks(c => [
          ...c,
          { timeStamp: Date.now() },
        ]);
      }, rand);
    }
  }, [pressed]);

  useEffect(() => {
    if (clicks.length === SAMPLE_SIZE * 2) {
      setRes(true);
    }
  }, [clicks]);

  const pointerDown = (e) => {
    if (ctext !== DEFAULTS.ctext) {
      return;
    }
    setActive(true);
    setPressed(true);
  }

  const pointerUp = (e) => {
    setPressed(false);
    if (!active || ctext !== DEFAULTS.ctext) {
      return;
    }
    if (!triggered) {
      setCtext('!');
      clearTimeout(liftTimer.current);
    } else {
      setCtext('Good');
      setClicks([
        ...clicks,
        {
          timeStamp: Date.now(),
          pressure: maxForce.current,
        },
      ]);
    }
    setActive(false);
    setTriggered(false);
    setTimeout(() => setCtext(DEFAULTS.ctext), DELAY);
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
          id="circle"
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
