import { createSlice } from '@reduxjs/toolkit';
import ROUTES from '@Constants/Routes';


export const routesSlice = createSlice({
  name: 'routes',
  initialState: {
    routes:[
        {label:"Accueil", link:ROUTES.HOME, subMenu:false},
        {label:"Portefolio", link:"/Portefolios", subMenu:true, open:false, children:[]},
        {label:"Prestations", link:"/Prestations", subMenu:true, open:false, children:[]},
        {label:"Artisan", link:"/Artisan", subMenu:true, open:false, hidden:true, children:[]},
        {label:"À propos", link:ROUTES.APROPOS, subMenu:false},
        {label:"Contact", link:ROUTES.CONTACT, subMenu:false},
    ],
    currentRoute:ROUTES.HOME
  },
  reducers: {
    setPortefoliosRoutes:(state, action) => {
      const newChildren = []
      const portefolios = action.payload
      portefolios.forEach(portefolio => {
        newChildren.push({label:portefolio.name, link:`/Portefolios/${portefolio.name}`, id:portefolio.id})
      })
      const portefolioRouteIndex = state.routes.findIndex(route => route.label === "Portefolio")
      state.routes[portefolioRouteIndex].children = newChildren
    },
    setPrestationsRoutes:(state, action) => {
      const newChildren = []
      const prestations = action.payload
      prestations.forEach(prestation => {
        newChildren.push({label:prestation.name, link:`/Prestations/${prestation.name}`, id:prestation.id})
      })
      const prestationRouteIndex = state.routes.findIndex(route => route.label === "Prestations")
      state.routes[prestationRouteIndex].children = newChildren
    },
    setArtisansRoutes:(state, action) => {
      const newChildren = []
      const artisans = action.payload
      artisans.forEach(artisan => {
        newChildren.push({label:artisan.name, link:`/Artisans/${artisan.name}`, id:artisan.id})
      })
      const artisanRouteIndex = state.routes.findIndex(route => route.label === "Artisan")
      state.routes[artisanRouteIndex].children = newChildren
    },
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
  closeSubMenu,

  setPortefoliosRoutes,
  setPrestationsRoutes,
  setArtisansRoutes,
} = routesSlice.actions;

export const routesReducer = routesSlice.reducer;