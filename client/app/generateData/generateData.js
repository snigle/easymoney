import React from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import _ from "lodash";
import { insert } from "../../components/reducers/operations/operations.actions";

class GenerateData extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    let date = new Date();
    let operation = { value : -10 };
    _.forEach(Array(365), (v,i) => {
      operation.title = "operation" + i;
      operation.date = date;
      this.props.insert(operation);
      date.setDate(date.getDate() - 1);
    });
    browserHistory.goBack();
  }

  render() {
    return null;
  }
}

export default connect(
  null,
  { insert }
)(GenerateData);
