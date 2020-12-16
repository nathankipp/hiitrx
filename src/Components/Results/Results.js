import React from 'react';
import { Link } from 'react-router-dom';

function Results({ speed, readiness }) {
  return (
    <section className="section">
      <article className="message is-info">
        <div className="message-header">
          <p>HIIT readiness</p>
        </div>
        <div className="message-body">{readiness}%</div>
      </article>
      <article className="message is-info">
        <div className="message-header">
          <p>Reaction score</p>
        </div>
        <div className="message-body">{speed} ms</div>
      </article>
      <div className="has-text-centered">
        <Link to="/home">
          <button className="button is-black">Done</button>
        </Link>
      </div>
    </section>
  );
}

export default Results;
