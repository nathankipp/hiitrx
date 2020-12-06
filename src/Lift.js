import React, { useState, useRef, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Pressure from 'pressure';
import LS from './ls';
import { liftItem } from './items';
import { putItemInTable } from './db';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const DEFAULTS = {
  ctext: 'Press',
}
const DELAY = 1500;
const SAMPLE_SIZE = 5;

function Lift({ history }) {
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
      const speed = clicks.reduce((acc, cur, idx, arr) => {
        if ((idx % 2)) return acc;
        return [...acc, arr[idx + 1].timeStamp - cur.timeStamp];
      }, []);
      history.push(`/results?speed=${speed}`)
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
      reset();
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

  if (!LS.isValid()) {
    history.push('/');
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
        {res ? (
          <div className="circle">
            <FontAwesomeIcon spin size="1x" icon={faSpinner} />
          </div>
        ) : (
          <div
            id="circle"
            className={`circle ${pressed && 'pressed'} ${triggered && 'triggered'}`}
            onPointerDown={pointerDown}
            onPointerUp={pointerUp}
          >
            {ctext}
          </div>
        )}
      </section>
    </div>
  );
}
// {res && <Results clicks={clicks} reset={reset} />}

export default withRouter(Lift);
