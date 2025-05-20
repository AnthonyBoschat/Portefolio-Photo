import { createSlice } from '@reduxjs/toolkit';



export const artisansSlice = createSlice({
  name: 'artisans',
  initialState: {
    collections:[]
  },
  reducers: {
    setArtisansList:(state,action) => {
        state.collections = action.payload
    }
  },
});

export const { 
    setArtisansList
} = artisansSlice.actions;

export const artisansReducer = artisansSlice.reducer;