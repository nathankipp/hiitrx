import React, { useState, useRef, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Pressure from 'pressure';
import { liftItem } from '../../utils/items';
import { put } from '../../utils/db';
import Progress from '../Progress';

const DEFAULTS = {
  ctext: 'Press',
}
const DELAY = 1500;
const SAMPLE_SIZE = 5;

const saveLifts = (clicks) => {
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
      put(item, 'lift').then(resolve).catch(reject);
    }));
  }
  return Promise.all(items);
}

const getLiftIntervals = clicks => clicks.reduce(
  (acc, cur, idx, arr) => (idx % 2)
    ? acc
    : [ ...acc, arr[idx + 1].timeStamp - cur.timeStamp],
  []
);

function Lift({ setLifts, updateHiitrx, history }) {
  const [ctext, setCtext] = useState(DEFAULTS.ctext);
  const [clicks, setClicks] = useState([]);
  const [active, setActive] = useState(false);
  const [res, setRes] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [triggered, setTriggered] = useState(false);
  const liftTimer = useRef(null);
  const maxForce = useRef(0);
  const textChange = useRef();

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

  useEffect(() => {
    if (pressed) {
      const rand = DELAY + Math.round(Math.random() * 250);
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
      const lifts = getLiftIntervals(clicks);
      setLifts(lifts);
      saveLifts(clicks)
        .then(updateHiitrx)
        .then(() => history.replace('/results'))
        .catch(() => {});
      clearTimeout(textChange.current);
    }
  }, [clicks, setLifts, updateHiitrx, history]);

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
    textChange.current = setTimeout(() => setCtext(DEFAULTS.ctext), DELAY);
  }

  if (res) {
    return <Progress />;
  }

  return (
    <div className="px-4 py-4">
      <div className="mb-4">
        Press with your thumb.
        When the border turns red, lift your thumb.
        Repeat five times.
      </div>
      <section
        className={`section py-0 lift`}
        style={{
          position: 'absolute',
          bottom: 30,
          left: '50%',
          transform: 'translate(-50%)',
        }}
      >
        <div
          id="circle"
          className={`circle ${pressed && 'pressed'} ${triggered && 'triggered'}`}
          onPointerDown={pointerDown}
          onPointerUp={pointerUp}
        >
          {ctext}
        </div>
      </section>
    </div>
  );
}

export default withRouter(Lift);
