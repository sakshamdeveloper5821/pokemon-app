import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPokemonDetails } from '../store/pokemonSlice';
import { RootState, useAppDispatch, useAppSelector } from '../store/store';

const PokemonDetails: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const dispatch = useAppDispatch();

  // Access state from Redux
  const { details: pokemon, loading, error } = useAppSelector(
    (state: RootState) => state.pokemon
  );

  useEffect(() => {
    if (name) {
      dispatch(getPokemonDetails(name));
    }
  }, [dispatch, name]);

  return (
    <div className="p-4 bg-slate-100">
      <Link to="/" className="text-blue-500 mb-4 inline-block">← Back to Home</Link>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        pokemon && (
          <div className='sm:w-[30%] rounded-md'>
            <div className='bg-[#64ddcb] p-4'>
              <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
              <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                className="w-48 h-48 mx-auto"
              />
            </div>
            <div className='bg-[#f8cb6b] p-4'>  
              <p className="mt-4"><strong>Height:</strong> {pokemon.height}</p>
              <p><strong>Weight:</strong> {pokemon.weight}</p>
              
              <p><strong>Types:</strong> 
                {pokemon.types.map((type: { type: { name: string } }, index: number) => (
                  <span key={index} className="capitalize">
                    {type.type.name}{index < pokemon.types.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
              
              <p><strong>Abilities:</strong> 
                {pokemon.abilities.map((a: { ability: { name: string } }, index: number) => (
                  <span key={index} className="capitalize">
                    {a.ability.name}{index < pokemon.abilities.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>

              <h2 className="text-2xl font-bold mt-6">Stats</h2>
              <ul className="mt-2">
                {pokemon.stats.map((stat: { base_stat: number; stat: { name: string } }, index: number) => (
                  <li key={index} className="flex gap-2">
                    <span className="capitalize font-semibold">{stat.stat.name}:</span>
                    <span>{stat.base_stat}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold mt-6">Moves</h2>
              <ul className="mt-2">
                {pokemon.moves.slice(0, 10).map((move: { move: { name: string } }, index: number) => (
                  <li key={index} className="flex gap-2 capitalize">
                    <span>{move.move.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PokemonDetails;
