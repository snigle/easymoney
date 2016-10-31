import React from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
require("./operationForm.less");
import { insert, update } from "../../../../components/reducers/operations/operations.actions";

class OperationForm extends React.Component {
  constructor(props) {
    super(props);
    console.log("form",props.params.operationID);
    if (props.params.operationID) {
      this.state = { ...props.operations[props.params.operationID],
        uuid : props.params.operationID };
    } else {
      this.state = {
        title : "",
        comment : "",
        value : 0.0,
      };
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.insert = props.insert;
    this.update = props.update;
  }

  handleChange(event) {
    const state = Object.assign({ }, this.state);
    console.log("target", event.target);
    console.log("target", event.target.type);
    if (event.target.type === "number") {
    state[event.target.name] = -Math.abs(parseFloat(event.target.value, 10));
  } else {
    state[event.target.name] = event.target.value;
  }
    console.log("event",event.target);
    console.log("event",event.target.name);
    // this.setState({title: event.target.value});
    this.setState(state);
  }

  handleSubmit(event) {
    if (this.state.uuid) {
      this.update(this.state);
    } else {
      this.insert(this.state);
    }
  }

  render(props) {
    return (
      <div id="operationForm">
        <header>Nouveau : </header>
        <div>Wallet</div>
        <form className="form">
          <input type="number"
            className="form-control"
            placeholder="price"
            name="value"
            value={this.state.value}
            onChange={this.handleChange} />
          <input type="text"
            className="form-control"
            placeholder="title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange} />
          <input type="text"
            className="form-control"
            placeholder="comment"
            name="comment"
            value={this.state.comment}
            onChange={this.handleChange} />
          <button type="button" onClick={this.handleSubmit}>Sauver & Fermer</button>
        </form>
      </div>
    );
  }
}

export default connect(
  (state) => ({ number: state.counter.number, operations : state.operations }),
  { insert, update }
)(OperationForm);
