import { configureStore } from '@reduxjs/toolkit'
import pokemonsSlice from './pokemons.slice'

export default configureStore({
  reducer: {
      pokemons: pokemonsSlice,
  },
})