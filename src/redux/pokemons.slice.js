import { createSlice } from '@reduxjs/toolkit'

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState: {
    pokemons: [],
    pokemonsFilter: [],
  },
  reducers: {
    setPokemonsList: (state, action) => {
        state.pokemons = [...action.payload];
        state.pokemonsFilter = [...action.payload];
    },
    filterPokemonsList: (state, action) => {
      state.pokemonsFilter = [...action.payload]
    },
  },
})

// Action creators are generated for each case reducer function
export const { setPokemonsList, filterPokemonsList } = pokemonsSlice.actions

export default pokemonsSlice.reducer