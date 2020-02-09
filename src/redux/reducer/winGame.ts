const initialState = {
    winGameCount: 0
};

export default function changeWinGame(state = initialState, action: {type: string}) {
    switch (action.type) {
        case 'decreaseWinGameCount':
            return {
                winGameCount: state.winGameCount - 1
            };
        case 'increaseWinGameCount':
            return {
                winGameCount: state.winGameCount + 1
            };    
        default:
            return state;
    }
}