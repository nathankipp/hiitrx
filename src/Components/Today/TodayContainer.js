import { connect } from 'react-redux';
import Today from './Today';
import getFullDate from '../../utils/getFullDate';
import { setToday, updateHiitrx } from '../../redux/actions';

const mapStateToProps = ({ schedule }) => {
  const {
    motivated,
    fast,
    sleep,
    sleepHours,
  } = schedule[getFullDate()];

  return {
    motivated: motivated || 5,
    fast: fast || 5,
    sleep: sleep || 5,
    sleepHours: sleepHours || 8,
  };
}

const mapDispatchToProps = { setToday, updateHiitrx };

export default connect(mapStateToProps, mapDispatchToProps)(Today);
