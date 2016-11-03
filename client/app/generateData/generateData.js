import React from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
import { hashHistory } from "react-router";
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
    console.log("Generate data");
    _.forEach(Array(365), (v,i) => {
      operation.title = "operation" + i;
      operation.date = date;
      this.props.insert(operation);
      date.setDate(date.getDate() - 1);
    });
    console.log("finish insert data");
    hashHistory.goBack();
  }

  render() {
    return null;
  }
}

export default connect(
  null,
  { insert }
)(GenerateData);
