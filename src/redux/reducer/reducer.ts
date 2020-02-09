const initialState = {
    coinNum: 1
};

export default function nonBombNum(state = initialState, action: {type: string}) {
    switch (action.type) {
        case 'decrease':
            return {
                coinNum: state.coinNum - 1
            };
        case 'increase':
            return {
                coinNum: state.coinNum + 1
            };    
        default:
            return state;
    }
}

// import {  } from "react-redux";