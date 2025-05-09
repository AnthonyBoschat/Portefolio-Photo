import { createSlice } from '@reduxjs/toolkit';



export const prestationsSlice = createSlice({
  name: 'prestations',
  initialState: {
    list:[]
  },
  reducers: {
    setPrestationsList:(state,action) => {
        state.list = action.payload
    }
  },
});

export const { 
    setPrestationsList
} = prestationsSlice.actions;

export const prestationsReducer = prestationsSlice.reducer;