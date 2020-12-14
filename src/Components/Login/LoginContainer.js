import { connect } from 'react-redux';
import Login from './Login';
import { reset, authenticate } from '../../redux/actions';

const mapDispatchToProps = { reset, authenticate };

export default connect(null, mapDispatchToProps)(Login);
