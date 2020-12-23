import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import noop from 'lodash/noop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { storage } from '../../lib';
import Timer from '../Timer';

import mockWorkout from './mock-workout'; // TODO: remove

export default function Workout() {
  const [workout, setWorkout] = useState({
    date: null,
    intervals: [],
  });
  const [count, setCount] = useState(0);

  useEffect(() => {
    mockWorkout();
    const storedWorkout = JSON.parse(storage.getItem('workout'));
    storedWorkout.intervals.forEach((_, idx) =>
      storage.removeItem(`interval-${idx}`)
    );
    setWorkout(storedWorkout);
  }, []);

  const currentInterval = workout.intervals[count];
  const timerId = `interval-${count}`;
  const onComplete = () => {
    const currentTimer = timerId;
    setTimeout(() => storage.removeItem(currentTimer), 0);
    setCount(count + 1);
  };

  return (
    <>
      <div className="table m-4">
        <div className="headings columns is-mobile">
          <div className="column is-9">Interval</div>
          <div className="column is-3 has-text-centered">Duration</div>
        </div>
        {workout.intervals.map((int, idx) => (
          <div
            key={`${int.name}-${idx}`}
            className={`columns is-mobile ${
              idx === count
                ? 'has-background-warning has-text-weight-bold'
                : idx % 2
                ? 'has-background-white-ter'
                : 'has-background-white'
            }`}
          >
            <div className="column is-1">
              <b>{idx + 1}</b>
            </div>
            <div className="column is-8">
              {idx < count && (
                <FontAwesomeIcon
                  className="mr-2 has-text-success"
                  icon={faCheckCircle}
                />
              )}
              <span>{int.name}</span>
            </div>
            <div className="column is-3 has-text-centered">{int.from}</div>
          </div>
        ))}
      </div>
      <div className="workout-preview-spacer"></div>
      <div className="workout-timer has-background-white has-text-centered">
        {currentInterval?.name ? (
          <>
            <div className="mt-2 mb-0 is-size-2 has-text-info">
              {currentInterval.name}
            </div>
            <div className="mb-2 is-size-5 has-text-info">
              {currentInterval.detail || <>&nbsp;</>}
            </div>
            <div className="mb-5">
              {workout.intervals.map((interval, idx) =>
                idx === count ? (
                  <Timer
                    key={timerId}
                    storageKey={timerId}
                    controls
                    direction={-1}
                    from={interval.from}
                    playBeep={noop}
                    onComplete={onComplete}
                    autoStart={idx > 0}
                  />
                ) : null
              )}
            </div>
          </>
        ) : (
          <div className="m-4 is-size-3 has-text-success has-text-centered">
            <div className="mb-6">Workout Completed!</div>
            <Link to="/home">
              <button className="button is-large is-black">Done</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
