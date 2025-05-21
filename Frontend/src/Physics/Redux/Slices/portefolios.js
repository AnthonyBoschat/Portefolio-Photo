import { createSlice } from '@reduxjs/toolkit';



export const portefoliosSlice = createSlice({
  name: 'portefolios',
  initialState: {
    collections:    [],
    representants:  [],
    labels:         [],
  },
  reducers: {
    init_portefolios:(state, action) => {

      const portefolios     = action.payload
      state.collections     = portefolios

      const representants   = []
      const labels          = []

      portefolios.map(portefolio => {
        const item          = {}
        item.name           = portefolio?.name
        const representant  = portefolio?.photos?.find(photo => photo?.representant)
        item.image          = representant?.image
        item.id             = representant?.id

        labels.push(portefolio?.name)
        representants.push(item)
      })

      state.representants   = representants
      state.labels          = labels

    },
  },
});

export const { 
    init_portefolios
} = portefoliosSlice.actions;

export const portefoliosReducer = portefoliosSlice.reducer;