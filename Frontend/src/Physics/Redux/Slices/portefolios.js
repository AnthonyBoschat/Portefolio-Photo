import { createSlice } from '@reduxjs/toolkit';



export const portefoliosSlice = createSlice({
  name: 'portefolios',
  initialState: {
    list:[]
  },
  reducers: {
    setPortefoliosList:(state,action) => {
        state.list = action.payload
    }
  },
});

export const { 
    setPortefoliosList
} = portefoliosSlice.actions;

export const portefoliosReducer = portefoliosSlice.reducer;