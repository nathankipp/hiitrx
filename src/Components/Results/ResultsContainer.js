import { connect } from 'react-redux';
import Results from './Results';
import { getFullDate, table } from '../../lib';
import { getWorkout, setWorkout, updateHiitrx } from '../../redux/actions';

const TESTS = [
  { id: 'ac', name: 'Aerobic Capacity' },
  { id: 'ap', name: 'Aerobic Power' },
  { id: 'nc', name: 'Anaerobic Capacity' },
];

const getReadines = (schedule) =>
  ['motivated', 'fast', 'sleep', 'sleepHours'].reduce(
    (acc, cur) => acc + table[cur][schedule[cur]],
    0
  );

const getNextTest = (schedule = {}) => {
  const testsTaken = Object.keys(schedule)
    .sort((a, b) => b.localeCompare(a))
    .reduce(
      (acc, cur) =>
        cur !== getFullDate() &&
        schedule[cur].workout &&
        !acc.find((testId) => testId === schedule[cur].workout.fitnessTestId)
          ? [...acc, schedule[cur].workout.fitnessTestId]
          : acc,
      []
    );

  return testsTaken.length < TESTS.length
    ? TESTS.find((test) => !testsTaken.includes(test.id)) // first not taken
    : TESTS.find((test) => test.id === testsTaken[testsTaken.length - 1]); // next in cycle
};

const getAvgSpeed = (lifts) => {
  const speeds = [...lifts.sort()];
  if (speeds.length === 5) {
    speeds.pop();
    speeds.shift();
  }
  const avg =
    speeds.reduce((acc, cur) => Number(acc) + Number(cur), 0) / speeds.length;

  return Math.round(avg);
};

const mapStateToProps = ({ schedule, fitnessTests }) => {
  const sched = schedule[getFullDate()];

  return {
    readiness: getReadines(sched),
    fitnessTests,
    nextTest: getNextTest(schedule),
    speed: getAvgSpeed(sched.lifts),
  };
};

const mapDispatchToProps = { getWorkout, setWorkout, updateHiitrx };

export default connect(mapStateToProps, mapDispatchToProps)(Results);
