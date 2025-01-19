import { createSlice } from '@reduxjs/toolkit';
import ROUTES from '@Constants/Routes';


export const routesSlice = createSlice({
  name: 'routes',
  initialState: {
    currentRoute:ROUTES.HOME
  },
  reducers: {

  },
});

export const { 
    
} = routesSlice.actions;

export const routesReducer = routesSlice.reducer;