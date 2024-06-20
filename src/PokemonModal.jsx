import React from 'react';

const PokemonModal = ({ pokemon, onClose }) => {
  if (!pokemon) return null;
  console.log(pokemon.name)

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-700">X</button>
        <div className="text-center text-blue-500">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-32 h-32 mx-auto"/>
          <h2 className="text-2xl font-bold mt-4">{pokemon.name}</h2>
          <p><strong>Height:</strong> {pokemon.height}</p>
          <p><strong>Weight:</strong> {pokemon.weight}</p>
          <p><strong>Type:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
          <p><strong>Abilities:</strong> {pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;
