import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import PokemonCard from "./PokemonCard";
import DatosPokemon from "./DatosPokemon";

const Pokedex = () => {
  const [listaPokemons, setListaPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const leerPokemons = async () => {
      try {
        const datosSinFormato = await fetch("https://pokeapi.co/api/v2/pokemon/");
        const datosJson = await datosSinFormato.json();

        let pokemons = await Promise.all(
          datosJson.results.map(async (pokemon) => {
            const datosPokemonRaw = await fetch(pokemon.url);
            const datosPokemon = await datosPokemonRaw.json();
            return datosPokemon;
          })
        );
        setListaPokemons(pokemons); 
      } catch (error) {
        Swal.fire("Error", "No se pudo conectar al API", "error");
        console.error(error);
      };
    };

    leerPokemons();
  },[]);

  const handlePokemonSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
  }

  return (
    <section className="col-sm-12 col-lg-8 d-flex justify-content-center flex-wrap z-1 mt-5">
      {listaPokemons.map((pokemon, index) => (
        <PokemonCard key={index} pokemon={pokemon} onSelect={handlePokemonSelect}/>
      ))}
      <DatosPokemon pokemon={selectedPokemon}/>
    </section>
  );
};

export default Pokedex;