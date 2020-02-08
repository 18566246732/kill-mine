import React from "react";
// const StateMachine = require('javascript-state-machine');
// import { StateMachine } from "javascript-state-machine";

export type ContextProps = {
    fsm: {
        state: string
    }
}
export const FsmContext = React.createContext<Partial<ContextProps>>({});
