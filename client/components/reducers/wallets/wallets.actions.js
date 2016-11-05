import uuid from "node-uuid";
import { INSERT, UPDATE, DELETE } from "./wallets.constants";

export let insert = (wallet) => ({
  type : INSERT,
  wallet : { ...wallet, uuid : uuid.v4() },
});

export let update = (wallet) =>({
  type : UPDATE,
  wallet : { ...wallet },
});

export let remove = (wallet) =>({
  type : DELETE,
  wallet : { ...wallet },
});
