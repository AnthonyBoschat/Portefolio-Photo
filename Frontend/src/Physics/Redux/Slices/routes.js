import { createSlice } from '@reduxjs/toolkit';
import ROUTES from '@Constants/Routes';


export const routesSlice = createSlice({
  name: 'routes',
  initialState: {
    routes:[
        {label:"Accueil", link:ROUTES.HOME, subMenu:false},
        {label:"Portefolio", link:"/Portefolios", subMenu:true, open:false, children:[
            {label:"Collaboration Artistique", link:ROUTES.PORTEFOLIOS.COLLABORATION_ARTISTIQUE},
            {label:"Fantastique", link:ROUTES.PORTEFOLIOS.FANTASTIQUE},
            {label:"Lumière Naturelle", link:ROUTES.PORTEFOLIOS.LUMIERE_NATURELLE},
            {label:"Nu - Lingerie", link:ROUTES.PORTEFOLIOS.NU_LINGERIE},
            {label:"Studio", link:ROUTES.PORTEFOLIOS.STUDIO},
        ]},
        {label:"Prestations", link:"/Prestations", subMenu:true, open:false, children:[
            {label:"Portrait", link:ROUTES.PRESTATIONS.PORTRAIT},
            {label:"Artisan", link:ROUTES.PRESTATIONS.ARTISAN},
            {label:"Boudoir", link:ROUTES.PRESTATIONS.BOUDOIR},
        ]},
        {label:"Artisan", link:"/Artisan", subMenu:true, open:false, hidden:true, children:[
          {label:"Atelier by Lou", link:`${ROUTES.ARTISAN}/1`}
        ]},
        {label:"À propos", link:ROUTES.APROPOS, subMenu:false},
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
          route.open = action.payload.startsWith(route.link)
        }
        return route
      })
    },
    openSubMenuForce:(state,action) => {
      state.routes = state.routes.map(route => {
          route.open = route.label === action.payload
          return route
      })
    },
    closeSubMenu:(state,action) => {
      state.routes = state.routes.map(route => {
          route.open = false
          return route
      })
    }
  },
});

export const { 
  openSubMenu,
  openSubMenuForce,
  setCurrentRoute,
  closeSubMenu
} = routesSlice.actions;

export const routesReducer = routesSlice.reducer;