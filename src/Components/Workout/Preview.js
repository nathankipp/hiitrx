import React from 'react';

export default function Preview({ intervals, onNext }) {
  return (
    <div className="table m-4">
      <div className="headings columns is-mobile">
        <div className="column is-9">Interval</div>
        <div className="column is-3 has-text-centered">Duration</div>
      </div>
      {intervals.map((int, idx) => (
        <div
          key={`${int.name}-${idx}`}
          className={`columns is-mobile ${
            idx % 2 ? 'has-background-white-ter' : ''
          }`}
        >
          <div className="column is-1">
            <b>{idx + 1}</b>
          </div>
          <div className="column is-8">{int.name}</div>
          <div className="column is-3 has-text-centered">{int.from}</div>
        </div>
      ))}
      <button className="button is-black mb-4 fixed-button" onClick={onNext}>
        Start Workout
      </button>
    </div>
  );
}
