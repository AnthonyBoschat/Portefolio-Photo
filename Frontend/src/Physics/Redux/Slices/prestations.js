import { createSlice } from '@reduxjs/toolkit';



export const prestationsSlice = createSlice({
  name: 'prestations',
  initialState: {
    collections:[],
    representants:[]
  },
  reducers: {
    init_prestations:(state, action) => {
      const prestations = action.payload
      state.collections = prestations
      const representants = []
      prestations.map(prestation => {
        const item = {}
        item.name = prestation?.name
        const representant = prestation?.photos?.find(photo => photo?.representant)
        item.image = representant?.image
        representants.push(item)
      })
      state.representants = representants
    },
  },
});

export const { 
    setPrestationsList,
    init_prestations
} = prestationsSlice.actions;

export const prestationsReducer = prestationsSlice.reducer;