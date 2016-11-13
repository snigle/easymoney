import React from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
import { browserHistory, Link } from "react-router";
import _ from "lodash";
import moment from "moment";
import { Element, scroller } from "react-scroll";

import { FlatButton, Paper, AppBar, IconButton } from "material-ui";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import muiThemeable from "material-ui/styles/muiThemeable";

import Operation from "./operation/operation";

require("./monthOperations.less");

class MonthOperations extends React.Component {

  componentDidMount(){
    setTimeout(() => scroller.scrollTo("today", { containerId : "scrollContainer" }), 250);
  }

  render() {
  //Get this value from wallet
  let currentSum = 100.0;
  return (
    <Paper id="monthOperations">
      <AppBar
        className="appBar"
        title={this.props.wallet.name}
        iconElementLeft={
          <IconButton onClick={browserHistory.goBack}><NavigationClose /></IconButton>
        }
        iconElementRight={
          <FlatButton containerElement={<Link to="/operationForm" />} label="Add"/>
          }
      />
    <div className="appBody element" id="scrollContainer">
      {
        _.map(this.props.operations, ([day,operations]) => (
          <div key={day} >
            <div className="day" style={{ backgroundColor : (day === this.props.today ? this.props.muiTheme.palette.accent1Color : null) }}>
              {moment(day, "YYYY-MM-DD").format("DD MMMM YYYY")}
              {day === this.props.today ? <Element name="today"> (Today)</Element> : ""}
            </div>
            <div>{ operations.map((operation) => {
                currentSum += operation.value;
                return(
                  <Operation key={operation.uuid}
                    currency="EUR"
                    price={operation.value || 0}
                    currentTotal={currentSum}
                    category="Restaurant"
                    icon="cutlery"
                    color="lightgreen"
                    title={operation.title}
                    onClick={() => browserHistory.push(`/operationForm/${operation.uuid}`)}
                    />
                );
              })}
            </div>
          </div>)
        )
      }
    </div>
    </Paper>
  );
}

}

const mapReducerToProps = (reducers) => {
  const operationsPerDay = _.groupBy(_.filter(_.values(reducers.operations), (operation) => !operation.deleted), "date");
  const today = moment().format("YYYY-MM-DD");
  if (!operationsPerDay[today]) {
    operationsPerDay[today] = [];
  }
  const operations = _.sortBy(_.toPairs(operationsPerDay), ([date, operations]) => date);
  return {
    operations : operations,
    wallet : { name : "Compte courant" },
    today : today,
  };
};

export default muiThemeable()(connect(
  mapReducerToProps,
  { }
)(MonthOperations));
