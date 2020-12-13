import { connect } from 'react-redux';
import App from './App';
import { authenticate } from '../../redux/actions';

const mapStateToProps = state => {
  console.table(state.schedule);
  return {
    isLoaded: !!state.hash,
  };
}

const mapDispatchToProps = { authenticate };

export default connect(mapStateToProps, mapDispatchToProps)(App);
