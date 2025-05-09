import { createSlice } from '@reduxjs/toolkit';



export const artisansSlice = createSlice({
  name: 'artisans',
  initialState: {
    list:[]
  },
  reducers: {
    setArtisansList:(state,action) => {
        state.list = action.payload
    }
  },
});

export const { 
    setArtisansList
} = artisansSlice.actions;

export const artisansReducer = artisansSlice.reducer;