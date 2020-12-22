import { connect } from 'react-redux';
import Events from './Events';
import { setEvents, updateHiitrx } from '../../redux/actions';

const mapStateToProps = ({ events }) => ({
  events: events.sort(),
});

const mapDispatchToProps = { setEvents, updateHiitrx };

export default connect(mapStateToProps, mapDispatchToProps)(Events);
