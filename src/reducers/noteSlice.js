
const initialState = []
const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADDNOTE':
            return state.concat(action.payload)
        case 'SETNOTES':
            return action.payload
        default:
            return state

    }
}

export const setNotes = (notes) => {
    return {
        type: "SETNOTES",
        payload: notes
    };
};
export const appendNote = (value) => {
    return {
        type: 'ADDNOTE',
        payload: value
    }
}

export default noteReducer