import { createSlice } from '@reduxjs/toolkit';
import ROUTES from '@Constants/Routes';


export const routesSlice = createSlice({
  name: 'routes',
  initialState: {
    routes:[
        {label:"Accueil", link:ROUTES.HOME, subMenu:false},
        {label:"Portefolio", link:ROUTES.PORTEFOLIOS.INDEX, subMenu:true, open:false, children:[]},
        {label:"Prestations", link:ROUTES.PRESTATIONS.INDEX, subMenu:true, open:false, children:[]},
        // {label:"Artisan", link:ROUTES.ARTISAN, subMenu:true, open:false, hidden:true, children:[]},
        {label:"À propos", link:ROUTES.APROPOS, subMenu:false},
        {label:"Contact", link:ROUTES.CONTACT, subMenu:false},
    ],
    currentRoute:ROUTES.HOME,
    pageDirectionConfig:{
      initial_x:"0%",
      exit_x:"-10%"
    },
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
    },
    setPageDirectionConfig:(state,action) => {
      state.pageDirectionConfig = action.payload
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
  // setArtisansRoutes,

  setPageDirectionConfig
} = routesSlice.actions;

export const routesReducer = routesSlice.reducer;