import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import LS from '../utils/ls';
import table from '../utils/table';

function Results({ location: { search }}) {
  const readiness = ['motivated', 'fast', 'sleep', 'sleepHours'].reduce((acc, cur) => {
    return acc + table[cur][LS.getItem(cur)];
  }, 0);

  const speed = search.split('=')[1].split(',').sort();
  if (speed.length === 5) { speed.pop(); speed.shift(); }
  const avgSpeed = speed.reduce((acc, cur) => Number(acc) + Number(cur), 0)/speed.length;

  return (
    <section className="section">
      <article className="message is-info">
        <div className="message-header">
          <p>HIIT readiness</p>
        </div>
        <div className="message-body">
          {readiness}%
        </div>
      </article>
      <article className="message is-info">
        <div className="message-header">
          <p>Reaction score</p>
        </div>
        <div className="message-body">
          {Math.round(avgSpeed)} ms
        </div>
      </article>
      <div className="has-text-centered">
        <Link to="/"><button className='button is-black'>Done</button></Link>
      </div>
    </section>
  );
}

export default withRouter(Results);
