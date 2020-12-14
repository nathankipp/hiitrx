import { connect } from 'react-redux';
import App from './App';
import { authenticate, setStatus } from '../../redux/actions';
import getFullDate from '../../utils/getFullDate';

const mapStateToProps = state => {
  const today = getFullDate();
  const appState = {
    isLoaded: !!state.hash,
    todaysSchedule: state.schedule?.[today] || {},
  };
  return appState;
}

const mapDispatchToProps = { authenticate, setStatus };

export default connect(mapStateToProps, mapDispatchToProps)(App);
