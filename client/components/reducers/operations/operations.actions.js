import uuid from "node-uuid";
import moment from "moment";
import { INSERT, UPDATE, DELETE } from "./operations.constants";

export let insert = (operation) => ({
  type : INSERT,
  operation : { ...operation, uuid : uuid.v4(), date : moment(operation.date).format("YYYY-MM-DD"), lastUpdate : moment().toISOString() },
});

export let update = (operation) =>({
  type : UPDATE,
  operation : { ...operation, date : moment(operation.date).format("YYYY-MM-DD"), lastUpdate : moment().toISOString() },
});

export let remove = (operation) =>({
  type : DELETE,
  operation : { ...operation, lastUpdate : moment().toISOString() },
});
