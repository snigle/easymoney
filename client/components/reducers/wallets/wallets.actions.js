import uuid from "node-uuid";
import moment from "moment";
import { INSERT, UPDATE, DELETE, UPDATE_ALL } from "./wallets.constants";

export let insert = (wallet) => ({
  type : INSERT,
  wallet : { ...wallet, uuid : uuid.v4(), lastUpdate : moment().toISOString() },
});

export let update = (wallet) =>({
  type : UPDATE,
  wallet : { ...wallet, lastUpdate : moment().toISOString() },
});

export let remove = (wallet) =>({
  type : DELETE,
  wallet : { ...wallet, delete : true, lastUpdate : moment().toISOString() },
});

export let updateAll = (wallets) =>({
  type : UPDATE_ALL,
  wallets : { ...wallets },
});
