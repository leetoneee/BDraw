import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice/counterSlice";
import drawReducer from "./drawSlice/drawSlice";
import startGameReducer from "./startGameSlice/startGameSlice"

const rootReducer = combineReducers({
    counter: counterReducer,
    draw: drawReducer,
    startGame: startGameReducer,
});

export default rootReducer;