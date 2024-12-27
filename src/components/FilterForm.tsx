import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPokemonTypes } from '../store/pokemonSlice';
import { useAppDispatch, RootState } from '../store/store';

interface FilterFormProps {
  onTypeChange: (type: string) => void;
  onNameChange: (name: string) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({ onTypeChange, onNameChange }) => {
  const dispatch = useAppDispatch();
  const { types, loading, error } = useSelector((state: RootState) => state.pokemon);
  
  const [selectedType, setSelectedType] = useState<string>(''); 

  useEffect(() => {
    dispatch(getPokemonTypes());
  }, [dispatch]);


  const handleTypeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedType(selected);  
    onTypeChange(selected);  
  };

  if (loading) {
    return <div>Loading Pokémon types...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded-md flex flex-col md:flex-row gap-4">
      <select
        className="border border-gray-300 rounded px-3 py-2"
        value={selectedType} 
        onChange={handleTypeSelect} 
      >
        <option value="">All Types</option>
        {types.map((type:{name:any}, index) => (
          <option key={index} value={type?.name?.name}>
            {type?.name?.name?.charAt(0).toUpperCase() + type?.name?.name?.slice(1)}
          </option>
        ))}
      </select>
      <input
        type="text"
        className="border border-gray-300 rounded px-3 py-2"
        placeholder="Search by name"
        onChange={(e) => onNameChange(e.target.value)}
      />
    </div>
  );
};

export default FilterForm;
