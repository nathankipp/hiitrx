import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import noop from 'lodash/noop';

import mockWorkout from './mock-workout'; // TODO: remove

const LOWER_LIMIT_SCORE = 85;

function Results({
  readiness,
  fitnessTests,
  nextTest,
  speed,
  setWorkout,
  updateHiitrx,
  history,
}) {
  const [working, setWorking] = useState([false, false]);

  const saveAndNext = () =>
    updateHiitrx()
      .then(() => history.push('/workout'))
      .catch(noop);

  const takeFitnessTest = () => {
    const id = nextTest.id;
    setWorking([true, false]);
    setWorkout({
      fitnessTestId: id,
      intervals: fitnessTests[id].intervals,
    });
    return saveAndNext();
  };

  const getWorkout = () => {
    setWorking([false, true]);
    Promise.resolve(mockWorkout).then((workout) => {
      setWorkout(workout);
      return saveAndNext();
    });
  };

  const canTest = readiness >= LOWER_LIMIT_SCORE;

  return (
    <div className="m-4">
      <article className="message is-info">
        <div className="message-header">
          <p>HIIT readiness</p>
        </div>
        <div className="message-body is-flex is-justify-content-space-between is-align-items-center">
          <div>{readiness}%</div>
          <div>
            {canTest && (
              <button
                className={`button ${working[0] && 'is-loading'}`}
                onClick={takeFitnessTest}
                disabled={working.includes(true)}
              >
                Test {nextTest.name}*
              </button>
            )}
          </div>
        </div>
      </article>
      <article className="message is-info">
        <div className="message-header">
          <p>Reaction score</p>
        </div>
        <div className="message-body">{speed} ms</div>
      </article>
      <div className="has-text-centered">
        <Link to="/home">
          <button className="button mr-2" disabled={working.includes(true)}>
            Back
          </button>
        </Link>
        <button
          className={`button is-black ${working[1] && 'is-loading'}`}
          disabled={working.includes(true)}
          onClick={getWorkout}
        >
          Get Workout
        </button>
      </div>
      {canTest && (
        <div className="fixed-button p-4 width-100 is-size-7 has-text-justified">
          * Your readiness is sufficient for an all-out fitness test. Regular
          testing can improve the accuracy and quality of your HIITRx workouts.
          Testing today will replace your workout.
        </div>
      )}
    </div>
  );
}

export default withRouter(Results);
