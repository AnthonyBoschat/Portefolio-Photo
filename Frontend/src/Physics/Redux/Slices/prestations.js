import { createSlice } from '@reduxjs/toolkit';



export const prestationsSlice = createSlice({
  name: 'prestations',
  initialState: {
    collections:    [],
    representants:  [],
    labels:         [],
  },
  reducers: {
    init_prestations:(state, action) => {
      const prestations     = action.payload
      state.collections     = prestations

      const representants   = []
      const labels          = []
      prestations.map(prestation => {

        const item          = {}
        item.name           = prestation?.name
        const representant  = prestation?.photos?.find(photo => photo?.representant)
        item.image          = representant?.image
        item.id             = representant?.id

        labels.push(prestation?.name)
        representants.push(item)
        
      })

      state.representants   = representants
      state.labels          = labels
    },
  },
});

export const { 
    setPrestationsList,
    init_prestations
} = prestationsSlice.actions;

export const prestationsReducer = prestationsSlice.reducer;