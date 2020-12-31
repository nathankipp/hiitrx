import React from 'react';
import { Link } from 'react-router-dom';

const LOWER_LIMIT_SCORE = 60;

function Results({ readiness, nextTest, speed }) {
  const canTeest = readiness >= LOWER_LIMIT_SCORE;
  return (
    <div className="m-4">
      <article className="message is-info">
        <div className="message-header">
          <p>HIIT readiness</p>
        </div>
        <div className="message-body is-flex is-justify-content-space-between is-align-items-center">
          <div>{readiness}%</div>
          <div>
            {canTeest && (
              <button className="button is-info is-light is-outlined">
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
          <button className="button mr-2">Back</button>
        </Link>
        <Link to="/workout">
          <button className="button is-black">Get HIITRx Workout</button>
        </Link>
      </div>
      {canTeest && (
        <div className="fixed-button p-4 width-100 is-size-7 has-text-justified">
          * Your readiness is sufficient for an all-out fitness test. Regular
          testing can improve the accuracy and quality of your HIITRx workouts.
          Testing today will replace your workout.
        </div>
      )}
    </div>
  );
}

export default Results;
