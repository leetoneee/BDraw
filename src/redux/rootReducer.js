import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice/counterSlice";
import drawReducer from "./drawSlice/drawSlice";
import startGameReducer from "./startGameSlice/startGameSlice"
import multiPlayerReducer from "./multiPlayerSlice/multiPlayerSlice";
import playerRegisterReducer from "./player/registerSlice/playerRegisterSlice";
import playerLoginReducer from "./player/loginSlice/playerLoginSlice";
import playerDetailReducer from "./player/playerDetailSlice/playerDetailSlice"

const rootReducer = combineReducers({
  counter: counterReducer,
  draw: drawReducer,
  startGame: startGameReducer,
  multiPlayer: multiPlayerReducer,
  playerReg: playerRegisterReducer,
  playerLog: playerLoginReducer,
  playerDetail: playerDetailReducer,
});

export default rootReducer;