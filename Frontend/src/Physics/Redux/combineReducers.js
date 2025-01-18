import { combineReducers } from "@reduxjs/toolkit";
import { phoneStateReducer } from "./Slices/phoneState";

const rootReducer = combineReducers({
    phoneState:phoneStateReducer,
});

export default rootReducer