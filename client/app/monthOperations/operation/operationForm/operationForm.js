import React from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
import { hashHistory } from "react-router";
import { DatePicker, TextField, RaisedButton, MenuItem, SelectField, Paper, AppBar, IconButton } from "material-ui";
import NavigationClose from "material-ui/svg-icons/navigation/close";
require("./operationForm.less");
import { insert, update } from "../../../../components/reducers/operations/operations.actions";

class OperationForm extends React.Component {
  constructor(props) {
    super(props);
    const operation = { ...props.operations[props.params.operationID] };
    console.log("form",props.params.operationID);
    if (props.params.operationID) {
      this.state = {
        operation : {
          ...operation,
          date : new Date(operation.date),
          type : operation.value > 0 ? 1 : -1,
        },
      };
    } else {
      this.state = {
        operation : {
          title : "",
          comment : "",
          value : 0.0,
          date : new Date(),
          category : "test",
          type : -1,
        }
      };
    }
    this.state.operations = props.operations;
    this.state.categories = [ { uuid : "test", name : "Restaurant", icon : "cutlery" }];
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.insert = props.insert;
    this.update = props.update;
  }

    handleChange(event, value) {
      const state = { ...this.state, operation : { ...this.state.operation } };
      if (event.target.name === "value") {
        state.operation[event.target.name] = state.operation.type * Math.abs(value);
      } else {
        state.operation[event.target.name] = value;
      }
      this.setState(state);
    }

    handleChangeCategory(event, index, value) {
      this.setState({ ...this.state, operation : { ...this.state.operation, category: value } });
    }

    handleChangeType(event, index, value) {
      const state = { ...this.state, operation : { ...this.state.operation } };
      state.operation.type = value;
      state.operation.value = state.operation.type * Math.abs(state.operation.value);
      this.setState(state);
    }

    handleChangeDate(event, date) {
      this.setState({ ...this.state, operation : { ...this.state.operation, date: date } });
    }

    handleSubmit(event) {
      if (this.state.uuid) {
        this.update(this.state.operation);
      } else {
        this.insert(this.state.operation);
      }
      hashHistory.goBack();
    }

    render() {
      return (
        <Paper id="operationForm">
          <AppBar
            title={this.state.operation.uuid ? "Edit operation" : "Create an operation"}
            iconElementLeft={
              <IconButton onClick={hashHistory.goBack}><NavigationClose /></IconButton>
            }
            iconElementRight={
              <SelectField name="type"
                style={{ "background-color": this.state.operation.type < 0 ? "red" : "green" }}  value={this.state.operation.type} onChange={(e,i,v) => this.handleChangeType(e,i,v)} fullWidth={true}>
                <MenuItem value={1} primaryText="Income"/>
                <MenuItem value={-1} primaryText="Outcome"/>
              </SelectField>
              }
          />
          <form className="form">
            <TextField
              floatingLabelText="Beneficiary / Element"
              name="title"
              hintText="Title"
              value={this.state.operation.title}
              onChange={this.handleChange}
              fullWidth={true}
              floatingLabelFixed={true}
              />
            <SelectField value={this.state.operation.category}
              floatingLabelFixed={true}
              floatingLabelText="Category"
              onChange={(e,i,v) => this.handleChangeCategory(e,i,v)} fullWidth={true}>
              {
                this.state.categories.map((category) => (
                  <MenuItem key={category.uuid} value={category.uuid} primaryText={category.name}
                   />
                ))
              }
            </SelectField>
            <div className="row">
            <div className="col-sm-6 col-xs-6">
              <TextField
                placeholder="price"
                fullWidth={true}
                name="value"
                type="number"
                floatingLabelText="Price"
                value={this.state.operation.value}
                onChange={this.handleChange}
                floatingLabelFixed={true}
                />
            </div>
            <div className="col-sm-6 col-xs-6">
              <DatePicker
                fullWidth={true}
                name="date"
                value={this.state.operation.date}
                onChange={(e,d) => this.handleChangeDate(e,d)}
                floatingLabelFixed={true}
floatingLabelText="Date"
                />
            </div>
          </div>
            <TextField
              name="comment"
              hintText="Comment"
              value={this.state.operation.comment}
              onChange={this.handleChange}
              fullWidth={true}
              floatingLabelFixed={true}
              floatingLabelText="Optional commentary"
              />
            <div className="row">
              <div className="col-sm-6 col-xs-6">
                <RaisedButton label="Save and Exit" primary={true} fullWidth={true} onClick={this.handleSubmit}/>
              </div>
              <div className="col-sm-6 col-xs-6">
                <RaisedButton label="Save and Create New" primary={true} fullWidth={true} onClick={this.handleSubmit}/>
              </div>
            </div>
            <div className="clearfix" />
          </form>
        </Paper>
      );
    }
  }

  export default connect(
    (state) => ({ operations : state.operations }),
    { insert, update }
  )(OperationForm);
