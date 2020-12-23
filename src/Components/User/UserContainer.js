import { connect } from 'react-redux';
import User from './User';
import { setUser, updateHiitrx } from '../../redux/actions';

const mapStateToProps = ({ name, age }) => ({
  user: { name, age },
});

const mapDispatchToProps = { setUser, updateHiitrx };

export default connect(mapStateToProps, mapDispatchToProps)(User);
