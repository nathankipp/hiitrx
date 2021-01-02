import { connect } from 'react-redux';
import { getFullDate } from '../../lib';
import { setWorkoutCompleted, updateHiitrx } from '../../redux/actions';
import Workout from './Workout';

const mapStateToProps = ({
  schedule: {
    [getFullDate()]: { workout },
  },
}) => ({ workout });

const mapDispatchToProps = { setWorkoutCompleted, updateHiitrx };

export default connect(mapStateToProps, mapDispatchToProps)(Workout);
