import { combineReducers } from "@reduxjs/toolkit";
import { phoneStateReducer } from "./Slices/phoneState";
import { routesReducer } from "./Slices/routes";
import { ContactReducer } from "./Slices/Contact";
import { AppReducer } from "./Slices/App";
import { zoomReducer } from "./Slices/zoom";
import { portefoliosReducer } from "./Slices/portefolios";
import { artisansReducer } from "./Slices/artisans";
import { prestationsReducer } from "./Slices/prestations";

const rootReducer = combineReducers({
    phoneState:phoneStateReducer,
    routes:routesReducer,
    contact:ContactReducer,
    app: AppReducer,
    zoom: zoomReducer,
    portefolios: portefoliosReducer,
    prestations: prestationsReducer,
    artisans: artisansReducer,
});

export default rootReducer