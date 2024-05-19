import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice/counterSlice";

const rootReducer = combineReducers({
    counter: counterReducer,
});

export default rootReducer;