import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Acción asíncrona para obtener Pokémon
export const fetchPokemons = createAsyncThunk("pokemon/fetchPokemons", async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await res.json();
  return data.results.map((pokemon, index) => ({
    id: index + 1,
    name: pokemon.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
  }));
});

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    allPokemons: [], // Todos los Pokémon originales
    pokemons: [], // Lista filtrada que se muestra
    status: "idle",
  },
  reducers: {
    searchPokemon: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      if (!searchTerm) {
        state.pokemons = state.allPokemons; // Si el input está vacío, mostramos todos los Pokémon
      } else {
        state.pokemons = state.allPokemons.filter(
          (p) =>
            p.name.includes(searchTerm) || p.id.toString() === searchTerm
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allPokemons = action.payload;
        state.pokemons = action.payload; // Mostramos todos por defecto
      })
      .addCase(fetchPokemons.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { searchPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
