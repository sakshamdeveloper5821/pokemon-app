import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonList from './pages/PokemonList';
import PokemonDetails from './pages/PokemonDetails';

const App: React.FC = () => {
  return (
    <Router>
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
