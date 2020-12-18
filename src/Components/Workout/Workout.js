import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import noop from 'lodash/noop';
import { storage, getFullDate } from '../../lib';
import Preview from './Preview';
import Timer from '../Timer';

export default function Workout() {
  const [preview, setPreview] = useState(true);
  const [workout, setWorkout] = useState({
    date: null,
    intervals: [],
  });
  const [count, setCount] = useState(0);

  const beepLow = useRef();
  const beepHigh = useRef(null);

  useEffect(() => {
    async function getAudio() {
      beepLow.current = await new Audio(
        `${process.env.PUBLIC_URL}/beep-low.wav`
      );
      beepHigh.current = await new Audio(
        `${process.env.PUBLIC_URL}/beep-high.wav`
      );
      beepLow.current.load();
      beepHigh.current.load();
    }
    getAudio();
  }, []);

  const playBeep = (which) => {
    const beep = which === 'high' ? beepHigh.current : beepLow.current;
    beep.play().then(noop).catch(noop);
  };

  useEffect(() => {
    storage.setItem(
      'workout',
      JSON.stringify({
        date: getFullDate(),
        intervals: [
          {
            name: 'Test beeps 1',
            detail: 'whole number',
            from: '00:10',
          },
          {
            name: 'Test beeps 2',
            detail: 'fraction of sec',
            from: '00:7.5',
          },
          {
            name: 'Warm-up',
            from: '02:00',
          },
          {
            name: 'Sprint',
            detail: '90% HRmax',
            from: '00:30',
          },
          {
            name: 'Rest',
            from: '00:30',
          },
          {
            name: 'Sprint',
            detail: '90% HRmax',
            from: '00:30',
          },
          {
            name: 'Rest',
            from: '00:30',
          },
          {
            name: 'Sprint',
            detail: '90% HRmax',
            from: '00:30',
          },
          {
            name: 'Rest',
            from: '00:30',
          },
          {
            name: 'Sprint',
            detail: '90% HRmax',
            from: '00:30',
          },
          {
            name: 'Rest',
            from: '00:30',
          },
          {
            name: 'Sprint',
            detail: '90% HRmax',
            from: '00:30',
          },
          {
            name: 'Rest',
            from: '00:30',
          },
          {
            name: 'Sprint',
            detail: '90% HRmax',
            from: '00:30',
          },
          {
            name: 'Rest',
            from: '00:30',
          },
          {
            name: 'Sprint',
            detail: '90% HRmax',
            from: '00:30',
          },
          {
            name: 'Rest',
            from: '00:30',
          },
          {
            name: 'Sprint',
            detail: '90% HRmax',
            from: '00:30',
          },
          {
            name: 'Rest',
            from: '00:30',
          },
          {
            name: 'Sprint',
            detail: '90% HRmax',
            from: '00:30',
          },
          {
            name: 'Rest',
            from: '00:30',
          },
          {
            name: 'Sprint',
            detail: '90% HRmax',
            from: '00:30',
          },
          {
            name: 'Rest',
            from: '00:30',
          },
          {
            name: 'Cool-down',
            from: '05:00',
          },
        ],
      })
    );

    const storedWorkout = JSON.parse(storage.getItem('workout'));
    storedWorkout.intervals.forEach((_, idx) =>
      storage.removeItem(`interval-${idx}`)
    );
    setWorkout(storedWorkout);
  }, []);

  // useEffect(() => {
  //   // The wake lock sentinel.
  //   let wakeLock = null;
  //   // Function that attempts to request a screen wake lock.
  //   const requestWakeLock = async () => {
  //     try {
  //       wakeLock = await navigator.wakeLock.request('screen');
  //       wakeLock.addEventListener('release', () => {
  //         console.log('Screen Wake Lock released:', wakeLock.released);
  //       });
  //     } catch (err) {
  //       console.error(`${err.name}, ${err.message}`);
  //     }
  //   };
  //   // Request a screen wake lock…
  //   requestWakeLock();
  //
  //   return () => wakeLock.release();
  // }, []);

  const int = workout.intervals[count];
  const onComplete = () => {
    const currentTimer = `interval-${count}`;
    setTimeout(() => storage.removeItem(currentTimer), 0);
    setCount(count + 1);
  };

  if (preview) {
    return (
      <Preview
        intervals={workout.intervals}
        onNext={() => {
          setPreview(false);
        }}
      />
    );
  }

  return (
    <>
      {int?.name ? (
        <div className="m-4 has-text-centered">
          <div className="mb-2 is-size-2 has-text-info">{int.name}</div>
          <div className="mb-2 is-size-4 has-text-info">
            {int.detail || <>&nbsp;</>}
          </div>
          <div className="mb-5">
            {workout.intervals.map((interval, idx) =>
              idx === count ? (
                <Timer
                  key={`interval-${idx}`}
                  storageKey={`interval-${idx}`}
                  controls
                  direction={-1}
                  from={interval.from}
                  playBeep={playBeep}
                  onComplete={onComplete}
                  autoStart={idx > 0}
                />
              ) : null
            )}
          </div>
        </div>
      ) : (
        <div className="m-4 is-size-1 has-text-success has-text-centered">
          <div className="mb-6">Workout Completed!</div>
          <Link to="/home">
            <button className="button is-large is-black">Done</button>
          </Link>
        </div>
      )}
      {workout.intervals[count + 1] && (
        <>
          <hr className="my-4" />
          <div className="m-4 has-text-centered">
            <div className="is-size-5 mb-2">Up next</div>
            <div className="is-size-4 has-text-info">
              {workout.intervals[count + 1].name}
            </div>
            <pre className="has-background-white is-size-4">
              {workout.intervals[count + 1].from}
            </pre>
          </div>
        </>
      )}
    </>
  );
}
