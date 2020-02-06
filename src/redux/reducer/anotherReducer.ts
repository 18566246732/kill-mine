const initialState = {
    coinNum1: 0
};

export default function nonBombNum(state = initialState, action: {type: string}) {
    console.log('1111111', action, state);
    
    switch (action.type) {
        case 'decrease':
            return {
                coinNum1: state.coinNum1 - 1
            };
        case 'increase':
            return {
                coinNum1: state.coinNum1 + 1
            };    
        default:
            return state;
    }
}