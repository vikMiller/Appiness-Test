const initialState = []

const employees = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_LIST':
            return action.data;

        default:
            return state;
    }
}

export default employees