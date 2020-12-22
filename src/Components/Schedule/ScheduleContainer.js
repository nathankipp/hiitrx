import { connect } from 'react-redux';
import Schedule from './Schedule';
import { setActivity, setEffort, updateHiitrx } from '../../redux/actions';

const mapStateToProps = ({ schedule }) => ({ schedule });

const mapDispatchToProps = { setActivity, setEffort, updateHiitrx };

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
