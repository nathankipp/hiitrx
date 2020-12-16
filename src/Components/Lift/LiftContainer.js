import { connect } from "react-redux";
import Lift from "./Lift";
import getFullDate from "../../utils/getFullDate";
import { setLifts, setPressures, updateHiitrx } from "../../redux/actions";

const mapStateToProps = ({ schedule }) => ({
  lifts: schedule[getFullDate()]?.lifts,
});

const mapDispatchToProps = { setLifts, setPressures, updateHiitrx };

export default connect(mapStateToProps, mapDispatchToProps)(Lift);
