import React from 'react';

interface PokemonCardProps {
  name: string;
  imageUrl: string;
  onClick: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, imageUrl, onClick }) => {
  return (
    <div
      className="p-4 border border-gray-300 rounded-md shadow hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <img src={imageUrl} alt={name} className="w-full h-32 object-contain" />
      <h3 className="text-lg font-bold text-center mt-2 capitalize">{name}</h3>
    </div>
  );
};

export default PokemonCard;
