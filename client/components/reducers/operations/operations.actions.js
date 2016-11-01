import uuid from "node-uuid";
import moment from "moment";
import { INSERT, UPDATE } from "./operations.constants";

export let insert = (operation) => ({
  type: INSERT,
  operation: { ...operation, uuid: uuid.v4(), date: moment(operation.date).format("YYYY-MM-DD") }
});

export let update = (operation) =>({
  type: UPDATE,
  operation: { ...operation, date: moment(operation.date).format("YYYY-MM-DD") }
});
