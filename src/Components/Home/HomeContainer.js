import { connect } from 'react-redux';
import Home from './Home';
import { setSchedule, updateHiitrx } from '../../redux/actions';

const mapStateToProps = ({ schedule }) => ({ schedule });

const mapDispatchToProps = { setSchedule, updateHiitrx };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
