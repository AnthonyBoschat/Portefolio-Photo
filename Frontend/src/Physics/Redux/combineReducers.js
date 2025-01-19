import { combineReducers } from "@reduxjs/toolkit";
import { phoneStateReducer } from "./Slices/phoneState";
import { routesReducer } from "./Slices/routes";

const rootReducer = combineReducers({
    phoneState:phoneStateReducer,
    routes:routesReducer
});

export default rootReducer