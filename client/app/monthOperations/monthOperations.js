import React from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
import { browserHistory, Link } from "react-router";
import _ from "lodash";
import moment from "moment";
import { Element, scroller } from "react-scroll";

import { FlatButton, Paper, AppBar, IconButton, DropDownMenu, MenuItem } from "material-ui";
import NavigationBack from "material-ui/svg-icons/navigation/chevron-left";
import muiThemeable from "material-ui/styles/muiThemeable";

import Operation from "./operation/operation";

require("./monthOperations.less");

class MonthOperations extends React.Component {

  constructor(props) {
    super(props);
    const wallet = _.find(props.wallets, (wallet) => wallet.uuid === props.params.walletUUID);
    if (!wallet) {
      return;
    }
    const startOfMonth = moment().startOf("month");
    const startOfYear = moment().startOf("year");
    const nextMonths = moment(startOfMonth);
    nextMonths.add(2,"months");
    const lastMonth = moment(startOfMonth);
    lastMonth.add(-1,"months");
    const lastYear = moment(startOfYear);
    lastYear.add(-1,"years");
    const nextYear = moment(startOfYear);
    nextYear.add(1,"years");
    this.state = {
      wallet : wallet,
      periods : [
        { begin : startOfMonth, end : nextMonths, label : moment().format("MMMM") },
        { begin : lastMonth, end : nextMonths, label : "Last 2 months" },
        { begin : startOfYear, end : nextYear, label : "This year" },
        { begin : lastYear, end : startOfYear, label : "Last year" },
      ],
    };
    this.state = this.formatOperations(props);
  }

  componentDidMount() {
    setTimeout(() => scroller.scrollTo("today", { containerId : "scrollContainer" }), 250);
  }

  render() {
  //Get this value from wallet
  let currentSum = this.state.total;
  return (
    <Paper id="monthOperations">
      <AppBar
        className="appBar"
        title={this.state.wallet.name}
        iconElementLeft={
          <IconButton onClick={() => browserHistory.push("/wallet")}><NavigationBack /></IconButton>
        }
        iconElementRight={
          <FlatButton containerElement={<Link to={`/operationForm?walletUUID=${this.state.wallet.uuid}`} />} label="Add"/>
          }
      />
    <div className="appBody element" id="scrollContainer">
      <DropDownMenu fullWidth={true} value={this.state.period} onChange={this.handleChange}>
        { this.state.periods.map((p, i) => (
          <Link value={i} key={i} primaryText={p.label} to={`/wallets/${this.state.wallet.uuid}/operations/${p.begin.format("YYYY-MM-DD")}/${p.end.format("YYYY-MM-DD")}`}>
            <MenuItem value={i} primaryText={p.label} />
          </Link>
        ))}
      </DropDownMenu>
      {
        _.map(this.state.operations, ([day,operations]) => (
          <div key={day} >
            <div className="day" style={{ backgroundColor : (day === this.state.today ? this.props.muiTheme.palette.accent1Color : null) }}>
              {moment(day, "YYYY-MM-DD").format("DD MMMM YYYY")}
              {day === this.state.today ? <Element name="today"> (Today)</Element> : ""}
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

  componentWillReceiveProps(next) {
    if ((next.operations && this.props.operations !== next.operations) || next.params.begin !== this.props.params.begin || next.params.end !== this.props.params.end) {
      this.setState(this.formatOperations(next));
    }
  }

  formatOperations(props) {
    // Prepare operations
    const begin = moment(props.params.begin,"YYYY-MM-DD");
    const end = moment(props.params.end, "YYYY-MM-DD");
    const walletOperations = _.filter(_.values(props.operations), (operation) => (
      !operation.deleted &&
      operation.walletUUID === props.params.walletUUID &&
      moment(operation.date).year() === begin.year()
    ));
    const operationsPerDay = _.groupBy(_.filter(walletOperations, operation => moment(operation.date).isBetween(begin, end, null, "[)")), "date");
    const today = moment().format("YYYY-MM-DD");
    if (!operationsPerDay[today] && moment(today).isBetween(begin, end, null, "[)")) {
      operationsPerDay[today] = [];
    }
    const operations = _.sortBy(_.toPairs(operationsPerDay), ([date, operations]) => date);

    // Calculate total
    let total = this.state.wallet.totalPerYear[begin.add(-1,"years").year()] || 0;
    total = _.reduce(_.filter(walletOperations, (operation) => operation.date < props.params.begin), (res, operation) => (res + operation.value) , total);
    // Prepare wallet
    return { ...this.state,
      operations : operations,
      today : today,
      total : total,
      period : _.findIndex(this.state.periods, (p) => (p.begin.format("YYYY-MM-DD") === props.params.begin && p.end.format("YYYY-MM-DD") === props.params.end)),
    };
  }

}

export default muiThemeable()(connect(
  (state) => ({ operations : state.operations, wallets : state.wallets }),
  { }
)(MonthOperations));
