const initialState = {
    totalGameCount: 0
};

export default function changeTotalGame(state = initialState, action: {type: string}) {
    switch (action.type) {
        case 'decreaseTotalGameCount':
            return {
                totalGameCount: state.totalGameCount - 1
            };
        case 'increaseTotalGameCount':
            return {
                totalGameCount: state.totalGameCount + 1
            };    
        default:
            return state;
    }
}