import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storage, getFullDate } from '../../lib';
import Timer from '../Timer';

export default function Workout() {
  const [workout, setWorkout] = useState({
    date: null,
    intervals: [],
  });
  const [count, setCount] = useState(0);

  useEffect(() => {
    storage.setItem(
      'workout',
      JSON.stringify({
        date: getFullDate(),
        intervals: [
          {
            name: 'Warm-up',
            from: '00:10',
          },
          {
            name: 'Work',
            from: '00:05',
          },
          {
            name: 'Rest',
            from: '00:7.5',
          },
          {
            name: 'Work',
            from: '00:05',
          },
          {
            name: 'Cool-down',
            from: '00:10',
          },
        ],
      })
    );

    const workout = storage.getItem('workout');
    setWorkout(JSON.parse(workout));
  }, []);

  if (workout?.date !== getFullDate()) {
    return (
      <div className="has-text-danger has-text-centered">
        <b>
          Your workout isn't ready.
          <br />
          Please try again.
        </b>
      </div>
    );
  }

  const int = workout.intervals[count];
  const onComplete = () => {
    const currentTimer = `interval-${count}`;
    setTimeout(() => storage.removeItem(currentTimer), 0);
    setCount(count + 1);
  };

  return (
    <>
      {int?.name ? (
        <div className="m-4 has-text-centered">
          <div className="mb-2 is-size-1">Interval {count + 1}</div>
          <div className="mb-6 is-size-3 has-text-info">
            {int.name}
            {workout.intervals.map((interval, idx) =>
              idx === count ? (
                <Timer
                  key={`interval-${idx}`}
                  storageKey={`interval-${idx}`}
                  controls
                  direction={-1}
                  from={interval.from}
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
            <div className="is-size-3 mb-2">Up next</div>
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
