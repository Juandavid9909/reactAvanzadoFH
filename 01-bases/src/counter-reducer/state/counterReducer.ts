import { CounterAction } from "../actions/actions";
import { CounterState } from "../interfaces/interfaces";

export const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
    const { counter, changes } = state;

    switch(action.type) {
        case "reset":
            return {
                counter: 0,
                previous: 0,
                changes: 0
            };

        case "increaseBy":
            return {
                counter: counter + action.payload.value,
                previous: counter,
                changes: changes + 1
            };

        default:
            return state;
    }
};