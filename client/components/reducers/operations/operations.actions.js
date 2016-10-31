import uuid from "node-uuid";
import { INSERT, UPDATE } from "./operations.constants";

export let insert = (operation) => ({
  type: INSERT,
  operation: operation,
  uuid: uuid.v4()
});

export let update = (operation) =>({
  type: UPDATE,
  operation: operation,
  uuid: operation.uuid
});
