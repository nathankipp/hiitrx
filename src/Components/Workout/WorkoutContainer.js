import { connect } from 'react-redux';
import { getFullDate, table } from '../../lib';
import { setWorkoutCompleted, updateHiitrx } from '../../redux/actions';
import Workout from './Workout';

const xmapStateToProps = ({
  schedule: {
    [getFullDate()]: { workout },
  },
}) => ({ workout });

const mapStateToProps = (state) => {
  return { workout: state.schedule[getFullDate()].workout };
};

const mapDispatchToProps = { setWorkoutCompleted, updateHiitrx };

export default connect(mapStateToProps, mapDispatchToProps)(Workout);
