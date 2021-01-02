import { connect } from 'react-redux';
import Home from './Home';
import { getFullDate } from '../../lib';

const mapStateToProps = ({ schedule }) => {
  const sched = schedule[getFullDate()];

  return {
    hasLifts: !!sched?.lifts?.length,
    workoutIsComplete: !!sched?.workout?.completed,
  };
};

export default connect(mapStateToProps)(Home);
