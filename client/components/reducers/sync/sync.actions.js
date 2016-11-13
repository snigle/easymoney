import { SET_SYNC, NEW_SYNC } from "./sync.constants";

export const newSync = (filename) => ({
    type : NEW_SYNC,
    filename : filename,
});

export const setSync = (filename, uuid) => ({
    type : SET_SYNC,
    filename : filename,
    uuid : uuid,
});
