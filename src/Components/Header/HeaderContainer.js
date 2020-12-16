import { connect } from 'react-redux';
import Header from './Header';

const mapStateToProps = ({ hash, name }) => ({ isLoaded: !!hash, name });

export default connect(mapStateToProps)(Header);
