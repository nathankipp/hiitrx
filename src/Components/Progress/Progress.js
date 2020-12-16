import React from 'react';

export default function Progress() {
  return (
    <div className="m-4">
      <progress className="progress is-small is-success" max="100">
        loading
      </progress>
    </div>
  );
}
