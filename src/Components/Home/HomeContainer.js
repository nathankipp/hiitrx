import { connect } from 'react-redux';
import Home from './Home';
import { getFullDate } from '../../lib';

const mapStateToProps = ({ schedule }) => ({
  hasLifts: !!schedule[getFullDate()]?.lifts?.length,
});

export default connect(mapStateToProps)(Home);
