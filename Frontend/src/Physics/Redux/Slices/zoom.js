import { createSlice } from '@reduxjs/toolkit';



export const zoomSlice = createSlice({
  name: 'zoom',
  initialState: {
    active:false,
    photoURL:null,
    collection:[],
    photoIndex:null,
    last:false,
    first:false
  },
  reducers: {
    deactivateZoomOverlay:(state,action) => {
      state.active = false
    },
    setZoomPhoto:(state,action) => {
        const {collection, photoIndex} = action.payload
        state.active = true
        state.collection = collection
        state.photoIndex = photoIndex
        state.photoURL = collection[photoIndex].image ? collection[photoIndex].image : collection[photoIndex]
        state.last = state.photoIndex === state.collection.length
        console.log(state.collection.length)
        state.first = state.photoIndex === 0
    },
    nextPhoto:(state,action) => {
      if(state.photoIndex + 1 <= state.collection.length){
        state.photoIndex += 1
        state.last = state.photoIndex === state.collection.length - 1
        state.first = state.photoIndex === 0
        state.photoURL = state.collection[state.photoIndex].image

      }
    },
    previousPhoto:(state,action) => {
      if(state.photoIndex - 1 >= 0){
        state.photoIndex -= 1   
        state.last = state.photoIndex === state.collection.length
        state.first = state.photoIndex === 0
        state.photoURL = state.collection[state.photoIndex].image
      }
    }
  },
});

export const { 
  deactivateZoomOverlay,
    setZoomPhoto,
    nextPhoto,
    previousPhoto
} = zoomSlice.actions;

export const zoomReducer = zoomSlice.reducer;