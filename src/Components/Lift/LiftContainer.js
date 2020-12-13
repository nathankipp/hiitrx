import { connect } from 'react-redux';
import Lift from './Lift';
import { setSpeed } from '../../redux/actions';

const mapDispatchToProps = { setSpeed };

export default connect(null, mapDispatchToProps)(Lift);
