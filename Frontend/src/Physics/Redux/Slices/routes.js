import { createSlice } from '@reduxjs/toolkit';
import ROUTES from '@Constants/Routes';
import { Navigate } from 'react-router-dom';


export const routesSlice = createSlice({
  name: 'routes',
  initialState: {
    routes:[
        {label:"Accueil", link:ROUTES.HOME, subMenu:false},
        {label:"Portefolio", link:"/Portefolios", subMenu:true, open:false, children:[
            {label:"Portrait", link:ROUTES.PORTEFOLIOS},
            {label:"Nu", link:ROUTES.PORTEFOLIOS},
            {label:"Noir et blanc", link:ROUTES.PORTEFOLIOS},
        ]},
        {label:"Prestations", link:"/Prestations", subMenu:true, open:false, children:[
            {label:"Portrait", link:ROUTES.PRESTATIONS.PORTRAIT},
            {label:"Artisan", link:ROUTES.PRESTATIONS.ARTISAN},
            {label:"Boudoir", link:ROUTES.PRESTATIONS.BOUDOIR},
        ]},
        {label:"Contact", link:ROUTES.CONTACT, subMenu:false},
    ],
    currentRoute:ROUTES.HOME
  },
  reducers: {
    openSubMenu:(state,action) => {
      state.routes = state.routes.map(route => {
          if(route.label === action.payload){
              route.open = !route.open
          }
          return route
      })
    },
    setCurrentRoute:(state,action) => {
      state.currentRoute = action.payload
      state.routes = state.routes.map(route => {
        if(route.subMenu){
          route.open = action.payload.includes(route.label)
        }
        return route
      })
    }
  },
});

export const { 
  openSubMenu,
  setCurrentRoute
} = routesSlice.actions;

export const routesReducer = routesSlice.reducer;