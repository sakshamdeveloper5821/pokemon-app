import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchPokemonTypes,
  fetchPokemonList,
  fetchPokemonDetails,
  fetchPokemonTypesById,
} from "../services/api";

// Define the Pokemon interface
export interface Pokemon {
  types(types: any): unknown;
  name: string;
  url: string;
  // types?: string[];
}
export interface PokemonByType {
  name: string;
  url: string;
}
// Define the PokemonState interface
export interface PokemonState {
  types: Pokemon[];
  typeByName: PokemonByType[];
  pokemon: Pokemon[];
  details: any | null;
  loading: boolean;
  error: string | null;
}

// Initial state for the slice
const initialState: PokemonState = {
  types: [],
  typeByName: [],
  pokemon: [],
  details: null,
  loading: false,
  error: null,
};

// Thunk to fetch Pokémon types
export const getPokemonTypes = createAsyncThunk(
  "pokemon/getTypes",
  async () => {
    const types = await fetchPokemonTypes();
    return types.map((type: string) => ({ name: type }));
  }
);
export const getPokemonTypesById = createAsyncThunk(
  "pokemon/getTypesById",
  async (type: string) => {
    const types = await fetchPokemonTypesById(type);
    return types.map((type: string) => ({ name: type }));
  }
);
// Thunk to fetch Pokémon list
export const getPokemonList = createAsyncThunk("pokemon/getList", async () => {
  return await fetchPokemonList();
});

// Thunk to fetch Pokémon details
export const getPokemonDetails = createAsyncThunk(
  "pokemon/getDetails",
  async (name: string) => {
    const response = await fetchPokemonDetails(name);
    return response;
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPokemonTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPokemonTypes.fulfilled, (state, action) => {
        state.types = action.payload.map((type: { name: string }) => ({
          name: type.name,
        }));
        state.loading = false;
      })
      .addCase(getPokemonTypes.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch Pokémon types.";
      });
    //Handle the fetching of Pokémon Type by name
    builder
      .addCase(getPokemonTypesById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPokemonTypesById.fulfilled, (state, action) => {
        state.typeByName = action.payload.map(
          (type: { name: PokemonByType }) => ({
            name: type.name.name,
            url: type.name.url,
          })
        );
        state.loading = false;
      })
      .addCase(getPokemonTypesById.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch Pokémon types.";
      });

    // Handle the fetching of Pokémon list
    builder
      .addCase(getPokemonList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPokemonList.fulfilled, (state, action) => {
        state.pokemon = action.payload; 
        state.loading = false;
      })
      .addCase(getPokemonList.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch Pokémon list.";
      });

    // Handle the fetching of Pokémon details
    builder
      .addCase(getPokemonDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPokemonDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload; 
      })
      .addCase(getPokemonDetails.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch Pokémon details.";
      });
  },
});

// Export the reducer
export default pokemonSlice.reducer;
