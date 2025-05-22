const initialState = []
const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADDBLOG':
            return state.concat(action.payload)
        case 'SETBLOGS':
            return action.payload
        default:
            return state


    }
}
export const setBlogs = (blogs) => {
    return {
        type: "SETBLOGS",
        payload: blogs
    };
};
export const appendBlog = (value) => {
    return {
        type: 'ADDBLOG',
        payload: value
    }
}

export default blogReducer