import { createSlice } from '@reduxjs/toolkit';



export const ContactSlice = createSlice({
  name: 'Contact',
  initialState: {
    formData:{
        lastname:"",
        firstname:"",
        email:"",
        subject:0,
        message:"",
    }
  },
  reducers: {
    setFormData:(state, action) => {
        state.formData[action.payload.key] = action.payload.value
    },
    resetFormData:(state,action) => {
        state.formData = {
            lastname:"",
            firstname:"",
            email:"",
            subject:0,
            message:"",
        }
    }
  },
});

export const { 
    setFormData,
    resetFormData
} = ContactSlice.actions;

export const ContactReducer = ContactSlice.reducer;