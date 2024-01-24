import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import Header from "../components/Header/Header";
import "../components/PokemonPage/styles/PokemonPage.css";

const PokemonPage = () => {
  const { id } = useParams();

  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const [pokemon, getPokemon] = useFetch(url);

  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <>
      <Header />
      <div className={`pokemonPage__container ${pokemon?.types[0].type.name}`}>
        <figure className="pokemonPage__figure">
          <div className="pokemonPage__background"></div>
          <img
            className="pokemonPage__img"
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt=""
          />
        </figure>
        <h3 className="pokemonPage__id">#{id}</h3>
        <h2 className="pokemonPage__name">{pokemon?.name}</h2>
        <ul className="pokemonPage__basicStat">
          <li className="pokemonPage__list">
            <span>Weight</span>
            <span> {pokemon?.weight}</span>
          </li>
          <li className="pokemonPage__list">
            <span>Height</span>
            <span> {pokemon?.height}</span>
          </li>
        </ul>
        <div className="pokemonPage__basicStat__container">
          <ul className="pokemonPage__basicStat__type">
            <li className="pokemonPage__basicStats__titles">
              <span >Type</span>
              <span className="pokemonPage__abilities__types">
                {pokemon?.types.map((type, i) => (
                  <span className={`pokemonPage__abilities__types__color ${type.type.name}`} key={i}>{type.type.name}</span>
                ))}
              </span>
            </li>
          </ul>
          <ul className="pokemonPage__basicStat__abilities">
            <li className="pokemonPage__basicStats__titles">
              <span >Abilities</span>
              <span className="pokemonPage__abilities__types">
                {pokemon?.abilities.map((type, i) => (                 
                  <span className="pokemonPage__abilities__types__rectangle" key={i}>{type?.ability?.name}</span>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default PokemonPage;
