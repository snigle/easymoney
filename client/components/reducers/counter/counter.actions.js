import { INCREASE, DECREASE } from "./counter.constants";

export let increase = (n) => ({
    type : INCREASE,
    amount : n,
});

export let decrease = (n) =>({
    type : DECREASE,
    amount : n,
});
