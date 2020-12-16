import { connect } from "react-redux";
import Home from "./Home";
import { setActivity, setEffort, updateHiitrx } from "../../redux/actions";

const mapStateToProps = ({ schedule }) => ({ schedule });

const mapDispatchToProps = { setActivity, setEffort, updateHiitrx };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
