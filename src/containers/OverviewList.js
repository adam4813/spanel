import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as itemActions from "../actions/actions";
import List from "../components/List";

const mapStateToProps = state => {
  return {
    list: state.list.list
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ itemActions }, dispatch);
};

const OverviewList = connect(mapStateToProps, mapDispatchToProps)(List);

export default OverviewList;
