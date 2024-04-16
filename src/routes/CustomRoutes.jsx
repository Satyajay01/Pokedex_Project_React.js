import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Pokedex from '../Component/Pokedex';
import PokemonDetails from '../Component/PokemonDetails/PokemonDetails';

const CustomRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Pokedex />} />
      <Route path="/pokemon/:id" element={<PokemonDetails />} />
    </Routes>
  );
}

export default CustomRoutes;
