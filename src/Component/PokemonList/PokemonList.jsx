import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function downloadPokemons() {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/");
    // console.log(response);

    const pokemonResults = response.data.results;
    // console.log(pokemonResults);
    const pokemonResultPromise = pokemonResults.map((pokemon) =>axios.get(pokemon.url)
      // console.log(pokemonResultPromise)
    );

    const pokemonData = await axios.all(pokemonResultPromise);
    // console.log(pokemonData);

    const result = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      // console.log(pokemon);
      return {
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
      };
    });


    console.log("20 Pokimon Data (Name, image, types)",result);
    setPokemonList(result);
    setIsLoading(false);
  }
  useEffect(() => {

    downloadPokemons();
  }, []);
  return;
  <div className="pokemon-list-wrapper">
    <div>Pokemon List</div>
    {isLoading ? "Loading..." : "Data downloaded"}
  </div>;
};

export default PokemonList;
