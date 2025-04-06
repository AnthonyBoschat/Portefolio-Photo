import { createSlice } from '@reduxjs/toolkit';



export const phoneStateSlice = createSlice({
  name: 'phoneState',
  initialState: {
    menuOpen:false
  },
  reducers: {
    setOpenPhoneMenu:(state,action) => {
        state.menuOpen = action.payload
    },
  },
});

export const { 
    setOpenPhoneMenu
} = phoneStateSlice.actions;

export const phoneStateReducer = phoneStateSlice.reducer;