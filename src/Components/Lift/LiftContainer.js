import { connect } from 'react-redux';
import Lift from './Lift';
import { setLifts, updateHiitrx } from '../../redux/actions';

const mapDispatchToProps = { setLifts, updateHiitrx };

export default connect(null, mapDispatchToProps)(Lift);
