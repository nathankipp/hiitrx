import { connect } from 'react-redux';
import App from './App';
import { getHiitrx } from '../../redux/actions';
import { getFullDate } from '../../lib';

const mapStateToProps = (state) => {
  const today = getFullDate();
  const appState = {
    isLoaded: !!state.hash,
    todaysSchedule: state.schedule?.[today] || {},
  };
  return appState;
};

const mapDispatchToProps = { getHiitrx };

export default connect(mapStateToProps, mapDispatchToProps)(App);
