import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const POKEDEX_URL = "https://pokeapi.co/api/v2/pokemon/";

  async function downloadPokemons() {
    const response = await axios.get(POKEDEX_URL); // list of 20 pokemon.
    // console.log(response);

    const pokemonResults = response.data.results; // this is the array of pokemons from result
    // console.log(pokemonResults);

    const pokemonResultPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );
    // console.log(pokemonResultPromise)

    const pokemonData = await axios.all(pokemonResultPromise); // array of 20 pokemon detailed data
    // console.log(pokemonData);

    const pokeListResult = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      // console.log(pokemon);
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
      };
    });

    console.log("20 Pokemon Data (Id, Name, image, types)", pokeListResult);
    setPokemonList(pokeListResult);
    setIsLoading(false);
  }
  useEffect(() => {
    downloadPokemons();
  }, []);

  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {isLoading
          ? "Loading..."
          : pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} />
            ))}
      </div>
      <div className="controls">
        <button>Prev</button>
        <button>Next</button>
      </div>
    </div>
  );
};

export default PokemonList;
