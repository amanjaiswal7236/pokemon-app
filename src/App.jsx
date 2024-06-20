import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonModal from './PokemonModal';
import './App.css';

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => {
        const fetches = response.data.results.map(p => axios.get(p.url));
        Promise.all(fetches).then(results => setPokemon(results.map(r => r.data)));
      });
  }, []);

  const filteredPokemon = pokemon.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center font-bold mb-6">Pokémon</h1>
      <input 
        type="text" 
        placeholder="Search Pokémon" 
        className="mb-6 p-2 border rounded w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPokemon.map(p => (
          <div 
            key={p.id} 
            className="card border rounded p-4 shadow-lg cursor-pointer"
            onClick={() => setSelectedPokemon(p)}
          >
            <img src={p.sprites.front_default} alt={p.name} className="w-full h-auto"/>
            <h2 className="text-xl font-bold mt-4">{p.name}</h2>
          </div>
        ))}
      </div>
      {selectedPokemon && (
        <PokemonModal 
          pokemon={selectedPokemon} 
          onClose={() => setSelectedPokemon(null)} 
        />
      )}
    </div>
  );
};

export default App;
