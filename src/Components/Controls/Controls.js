import React from 'react';

const Controls = (props) => {
  const { running, disabled, start, stop, reset } = props;
  return (
    <div>
      {!running && (
        <button
          className="button is-large start is-success mr-4"
          disabled={disabled.start}
          onClick={start}
        >
          Start
        </button>
      )}
      {running && (
        <button className="button is-large stop is-warning mr-4" onClick={stop}>
          Pause
        </button>
      )}
      <button
        className="button is-large reset is-black mr-4"
        disabled={disabled.reset}
        onClick={reset}
      >
        Reset
      </button>
    </div>
  );
};

export default Controls;
