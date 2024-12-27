import { Pokemon, PokemonByType } from '@/store/pokemonSlice';
import axios from 'axios';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonTypes = async () => {
  const response = await axios.get(`${API_BASE_URL}/type`);
  return response.data.results;
};
export const fetchPokemonTypesById = async (type:string) => {
  const response = await axios.get(`${API_BASE_URL}/type/${type}`);
  const filtered = response.data.pokemon.map((p: { pokemon: PokemonByType }) => p.pokemon);
  return filtered;
};

export const fetchPokemonList = async (type?: string) => {
  const response = await axios.get(`${API_BASE_URL}/pokemon?limit=100`); 
  return response.data.results;
};

export const fetchPokemonDetails = async (name: string) => {
  const response = await axios.get(`${API_BASE_URL}/pokemon/${name}`);
  return response.data;
};
