import { createSlice } from '@reduxjs/toolkit';
import ROUTES from '@Constants/Routes';
import collab from "@Constants/StaticPhotos/photos/portefolio/index/collab.jpg";
import fantastique from "@Constants/StaticPhotos/photos/portefolio/index/fantastique.jpg";
import lumiereNaturelle from "@Constants/StaticPhotos/photos/portefolio/index/lumiereNaturelle.jpg";
import nu from "@Constants/StaticPhotos/photos/portefolio/index/nu.jpg";
import retouche from "@Constants/StaticPhotos/photos/portefolio/index/retouche.jpg";
import studio from "@Constants/StaticPhotos/photos/portefolio/index/studio.jpg";
import STATIC_PHOTOS from '@Constants/StaticPhotos/StaticPhotos';


export const routesSlice = createSlice({
  name: 'routes',
  initialState: {
    routes:[
        {label:"Accueil", link:ROUTES.HOME, subMenu:false},
        {label:"Portefolio", link:"/Portefolios", subMenu:true, open:false, children:[
            {label:"Collaboration Artistique", link:ROUTES.PORTEFOLIOS.COLLABORATION_ARTISTIQUE, representant:collab},
            {label:"Fantastique", link:ROUTES.PORTEFOLIOS.FANTASTIQUE, representant:fantastique},
            {label:"Lumière Naturelle", link:ROUTES.PORTEFOLIOS.LUMIERE_NATURELLE, representant:lumiereNaturelle},
            {label:"Retouche Créatives", link:ROUTES.PORTEFOLIOS.RETOUCHE_CREATIVE, representant:retouche},
            {label:"Nu - Lingerie", link:ROUTES.PORTEFOLIOS.NU_LINGERIE, representant:nu},
            {label:"Studio", link:ROUTES.PORTEFOLIOS.STUDIO, representant:studio},
        ]},
        {label:"Prestations", link:"/Prestations", subMenu:true, open:false, children:[
            {label:"Portrait", link:ROUTES.PRESTATIONS.PORTRAIT, representant:STATIC_PHOTOS.HOME.PRESTATION.PORTRAIT},
            {label:"Artisan", link:ROUTES.PRESTATIONS.ARTISAN, representant:STATIC_PHOTOS.HOME.PRESTATION.ARTISAN},
            {label:"Boudoir", link:ROUTES.PRESTATIONS.BOUDOIR, representant:STATIC_PHOTOS.HOME.PRESTATION.BOUDOIR},
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