import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import noop from 'lodash/noop';
import TimePicker from '../TimePicker';
import SliderScale from '../SliderScale';
import getFullDate from '../../utils/getFullDate';

function Today({ motivated, fast, sleep, sleepHours, setToday, updateHiitrx, history }) {
  const [date, setDate] = useState(getFullDate());
  const [answers, setAnswers] = useState({
    motivated,
    fast,
    sleep,
    sleepHours,
  });

  let [h, m] = `${sleepHours}`.split('.');
  h = h || 8;
  m = m || 0;

  const setItem = item => e => setAnswers({
    ...answers,
    [item]: Number(e.target.value.trim()),
  });

  return (
    <div className="px-4 py-4">
      <form onSubmit={(e) => e.preventDefault()}>
        <>
          <label htmlFor="motivated">How motivated are you to train?</label>
          <input
            id="motivated"
            name="motivated"
            defaultValue={answers.motivated}
            className="slider is-warning is-fullwidth is-large mt-2"
            step=".25"
            min="0"
            max="10"
            type="range"
            onChange={setItem('motivated')}
          />
          <SliderScale />
        </>
        <>
          <label htmlFor="fast">How fresh do your legs feel?</label>
          <input
            id="fast"
            name="fast"
            defaultValue={answers.fast}
            className="slider is-warning is-fullwidth is-large mt-2"
            step=".25"
            min="0"
            max="10"
            type="range"
            onChange={setItem('fast')}
          />
          <SliderScale scale={['Slow', 'Normal', 'Fast']} />
        </>
        <>
          <label htmlFor="sleep">How well did you sleep last night?</label>
          <input
            id="sleep"
            name="sleep"
            defaultValue={answers.sleep}
            className="slider is-warning is-fullwidth is-large mt-2"
            step=".25"
            min="0"
            max="10"
            type="range"
            onChange={setItem('sleep')}
          />
          <SliderScale scale={['Worse', 'Normal', 'Better']} />
        </>
        <TimePicker
          h={Number(h)}
          m={Number(`.${m}`)*60}
          onChange={setItem('sleepHours')}
        />
        <div className="has-text-centered">
          <button
            className="button is-black"
            onClick={() => {
              setToday(answers);
              updateHiitrx()
                .then(() => history.replace('/lift'))
                .catch(noop);
            }}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default withRouter(Today);
