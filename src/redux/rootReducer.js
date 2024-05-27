import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice/counterSlice";
import drawReducer from "./drawSlice/drawSlice";

const rootReducer = combineReducers({
    counter: counterReducer,
    draw: drawReducer
});

export default rootReducer;