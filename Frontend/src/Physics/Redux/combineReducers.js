import { combineReducers } from "@reduxjs/toolkit";
import { phoneStateReducer } from "./Slices/phoneState";
import { routesReducer } from "./Slices/routes";
import { ContactReducer } from "./Slices/Contact";

const rootReducer = combineReducers({
    phoneState:phoneStateReducer,
    routes:routesReducer,
    contact:ContactReducer,
});

export default rootReducer