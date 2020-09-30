import React, { useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Pressure from 'pressure';
import LS from './ls';
import { liftItem } from './items';
import { putItemInTable } from './db';

const DEFAULTS = {
  ctext: 'Press',
}
const DELAY = 1500;
const SAMPLE_SIZE = 5;

// const interval = (t1, t2) => t2 - t1;

// function Results({ clicks, reset }) {
//   const results = [{
//     item: 'Date',
//     value: new Date(clicks[0].timeStamp).toLocaleDateString()
//   },
//   {
//     item: 'Time',
//     value: new Date(clicks[0].timeStamp).toLocaleTimeString()
//   }];
//   const intervals = [];
//   for (let i = 0; i < SAMPLE_SIZE; i += 1) {
//     const index = i * 2;
//     const int = interval(clicks[index].timeStamp, clicks[index+1].timeStamp);
//     const press = Math.round(clicks[index+1].pressure * 1000)/10;
//     results.push({
//       item: `Delay ${i+1}`,
//       value: `${int}ms [${press}%]`
//     });
//     intervals.push(int);
//   }
//   results.push({
//     item: 'Average',
//     value: `${Math.round(intervals.reduce((a, c) => a+c, 0) / intervals.length)}ms`
//   })
//   return (
//     <div className="modal is-active">
//       <div className="modal-background"></div>
//       <div className="modal-content has-background-white has-text-centered">
//         <div className="my-2"
//           style={{ maxHeight: '70%', overflow: 'auto' }}
//         >
//           <table className="table is-size-7">
//             <thead>
//               <tr>
//                 <th>Event</th>
//                 <th>Result</th>
//               </tr>
//             </thead>
//             <tbody>
//               {results.map(r => (
//                 <tr key={r.item}>
//                   <td>{r.item}</td>
//                   <td>{r.value}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="button is-primary" onClick={reset}>Restart</div>
//       </div>
//     </div>
//   );
// }

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

  // const update = (ctext, active) => {
  //   setCtext(ctext);
  //   setActive(active);
  // }

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
      window.location.replace('/')
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
    return <Redirect to="/" />;
  }

  return (
    <div className="px-4 py-4">
      <div className="has-text-weight-semibold mb-4">
        Press with your thumb.
        When the border turns red, lift your thumb.
        Repeat five times.
      </div>
      <section
        className={`section py-0 lift`}
        style={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translate(-50%)',
        }}
      >
        <div
          id="circle"
          className={`circle ${pressed && 'pressed'} ${triggered && 'triggered'} ${res && 'is-hidden'}`}
          onPointerDown={pointerDown}
          onPointerUp={pointerUp}
        >
          {ctext}
        </div>
      </section>
    </div>
  );
}
// {res && <Results clicks={clicks} reset={reset} />}

export default Lift;
