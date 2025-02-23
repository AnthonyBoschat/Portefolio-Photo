import { combineReducers } from "@reduxjs/toolkit";
import { phoneStateReducer } from "./Slices/phoneState";
import { routesReducer } from "./Slices/routes";
import { ContactReducer } from "./Slices/Contact";
import { AppReducer } from "./Slices/App";

const rootReducer = combineReducers({
    phoneState:phoneStateReducer,
    routes:routesReducer,
    contact:ContactReducer,
    app: AppReducer
});

export default rootReducer