import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice/counterSlice";
import drawReducer from "./drawSlice/drawSlice";
import startGameReducer from "./startGameSlice/startGameSlice"
import multiPlayerReducer from "./multiPlayerSlice/multiPlayerSlice";

const rootReducer = combineReducers({
    counter: counterReducer,
    draw: drawReducer,
    startGame: startGameReducer,
    multiPlayer: multiPlayerReducer,
});

export default rootReducer;