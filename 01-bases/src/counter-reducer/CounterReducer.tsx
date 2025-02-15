import { useReducer } from "react";

import { counterReducer } from "./state/counterReducer";
import { CounterState } from "./interfaces/interfaces";
import { doIncreaseBy, doReset } from "./actions/actions";

const INITIAL_STATE: CounterState = {
    counter: 10,
    previous: 15,
    changes: 20
};

export const CounterReducerComponent = () => {
    const [counterState, dispatch] = useReducer(counterReducer, INITIAL_STATE);

    const handleReset = () => {
        dispatch(doReset());
    };

    const increaseBy = (value: number) => {
        dispatch(doIncreaseBy(value));
    };

    return (
        <>
            <h1>CounterReducer Segmentado</h1>

            <pre>
                { JSON.stringify(counterState, null, 2) }
            </pre>

            <button onClick={ () => increaseBy(1) }>
                +1
            </button>

            <button onClick={ () => increaseBy(5) }>
                +5
            </button>

            <button onClick={ () => increaseBy(10) }>
                +10
            </button>

            <button onClick={ handleReset }>
                Reset
            </button>
        </>
    );
};