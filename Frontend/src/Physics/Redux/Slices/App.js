import { createSlice } from '@reduxjs/toolkit';



export const AppSlice = createSlice({
  name: 'app',
  initialState: {
    mobile:true,
    desktop:false,
  },
  reducers: {
    setScreenSize:(state,action) => {
        state.desktop = action.payload >= 1024
        state.mobile = action.payload < 1024
    }
  },
});

export const { 
    setScreenSize
} = AppSlice.actions;

export const AppReducer = AppSlice.reducer;