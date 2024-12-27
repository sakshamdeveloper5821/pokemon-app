import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { getPokemonList, getPokemonTypesById, PokemonByType } from "../store/pokemonSlice"; 
import FilterForm from "../components/FilterForm";
import PokemonCard from "../components/PokemonCard";
import { useNavigate } from "react-router-dom";
import { Pokemon } from "../store/pokemonSlice";

const PokemonList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { pokemon, typeByName, loading, error } = useAppSelector(
    (state: RootState) => state.pokemon
  );

  const [filteredPokemon, setFilteredPokemon] = useState<PokemonByType[]>([]);

  useEffect(() => {
    dispatch(getPokemonList());
  }, [dispatch]);

  useEffect(() => {
    if (typeByName.length > 0) {
      setFilteredPokemon(typeByName);
    } else if (pokemon.length > 0) {
      setFilteredPokemon(pokemon);
    }
  }, [pokemon, typeByName]);

  // Filter Pokémon by type
  const handleTypeChange = (type: string) => {
    if (!type) {
      setFilteredPokemon(pokemon); 
      return;
    }
    dispatch(getPokemonTypesById(type));
  };

  const handleNameChange = (name: string) => {
    const filtered = pokemon.filter((p: Pokemon) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
    setFilteredPokemon(filtered);
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pokemon List</h1>
      <FilterForm
        onTypeChange={handleTypeChange}
        onNameChange={handleNameChange}
      />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {filteredPokemon.map((pokemon: PokemonByType) => (
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              imageUrl={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
              onClick={() => navigate(`/pokemon/${pokemon.name}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonList;
