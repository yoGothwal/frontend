import { combineReducers, createStore } from "redux";
import noteReducer from "./noteSlice";
import blogReducer from "./blogSlice";

const reducer = combineReducers({
    notes: noteReducer,
    blogs: blogReducer
})
const store = createStore(reducer)
store.subscribe(() => {
    //console.log("NOTES in store:", store.getState().notes, "BLOGS in store:", store.getState().blogs)
})
export default store