import React from 'react';

const Controls = (props) => {
  const { running, disabled, start, stop, reset, onEnd } = props;
  return (
    <div>
      {!running && (
        <button
          className="button is-large start is-success mx-2"
          disabled={disabled.start}
          onClick={start}
        >
          Start
        </button>
      )}
      {running && (
        <button className="button is-large stop is-warning mx-2" onClick={stop}>
          Pause
        </button>
      )}
      <button
        className="button is-large reset is-black mx-2"
        disabled={disabled.reset}
        onClick={reset}
      >
        Reset
      </button>
      {onEnd && (
        <button
          className="button is-large is-danger mx-2"
          onClick={() => {
            stop();
            onEnd();
          }}
        >
          End
        </button>
      )}
    </div>
  );
};

export default Controls;
