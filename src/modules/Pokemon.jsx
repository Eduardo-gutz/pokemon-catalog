/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getPokemon, getPokemonCharact, getPokemonStats, getAbility, getItem} from "../services/pokemon-api";
import { useSearchParams } from "react-router-dom";

const pokemonDefault = {
  id: 0,
  name: "c",
  base_experience: 113,
  height: 6,
  is_default: true,
  order: 56,
  weight: 75,
  abilities: [],
  forms: [],
  game_indices: [],
  held_items: [],
  location_area_encounters: "",
  moves: [],
  species: {
    name: "",
    url: "",
  },
  sprites: {
    back_default: "",
    back_female: "",
    back_shiny: "",
    back_shiny_female: "",
    front_default: "",
    front_female: "",
    front_shiny: "",
    front_shiny_female: "",
    other: {},
    versions: {},
  },
  stats: [],
  types: [],
  past_types: [],
};

const Modal = ({isOpen, close, children}) => {
    return (
        <div className={`modal ${isOpen ? 'modal--active': ''}`}>
            <div className="pokemon-item modal__inner">
                <p className="modal__cross" onClick={() => close()}>X</p>
                <div className="modal__content">
                    {children}
                </div>
            </div>
        </div>
    )
}

const Pokemon = () => {
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const [pokemon, setPokemon] = useState(pokemonDefault);
  const [pokemonCharacteristics, setPokemonCharacteristics ] = useState();
  const [pokemonStats, setPokemonStats] = useState();
  const [ability, setAbility] = useState();
  const [item, setItem] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openModalItem, setOpenModalItem] = useState(false);

  const getAbilities = async (abilityUrl) => {
      try{
          const ability = await getAbility(abilityUrl);
          console.log(ability);
          setAbility(ability);
          setOpenModal(true)
      } catch(error) {
          console.error(error);
      };
  };
  
  const getItems = async (abilityUrl) => {
      try{
          const item = await getItem(abilityUrl);
          console.log(item);
          setItem(item);
          setOpenModalItem(true)
      } catch(error) {
          console.error(error);
      };
  };

  const getPokemonDetails = async () => {
    try {
      const pokemon = await getPokemon(searchParams.get("id"));
      const pokemonChar = await getPokemonCharact(searchParams.get("id"));
      const pokemonStats = await getPokemonStats(searchParams.get("id"));

      setPokemon(pokemon);
      setPokemonCharacteristics(pokemonChar);
      setPokemonStats(pokemonStats);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPokemonDetails();
  }, []);
  return (
    <>
    <Modal isOpen={openModal} close={() => setOpenModal(false)}>
        <>
            <p className="modal__label">{ability?.name}</p>
            {ability?.effect_entries?.map((effect) => (
                <span key={effect.name}>
                    {effect.language.name === 'en' ?
                    <>
                        <p className="modal__text">
                            {effect.short_effect}
                        </p>
                        <p className="modal__text">
                            {effect.effect}
                        </p>
                    </>
                    : null}
                </span>
            ))}
        </>
    </Modal>
    <Modal isOpen={openModalItem} close={() => setOpenModalItem(false)}>
        <>
            <div className="modal__item-details">
                <div>
                    <p className="modal__label">{item?.name}</p>
                    <p className="modal__label">Attributes</p>
                    {item?.attributes?.map((attr) => (
                        <span key={attr.name}>
                            <p className="modal__text">
                                {attr.name}
                            </p>
                        </span>
                    ))}
                    <p className="modal__label">Category</p>
                    <span>
                        <p className="modal__text">
                            {item?.category?.name}
                        </p>
                    </span>
                </div>
                <img className="modal__image" src={item?.sprites.default} alt="" />
            </div>
            <p className="modal__label">Effect</p>
            {item?.effect_entries?.map((effect) => (
                <span key={effect.name}>
                    {effect.language.name === 'en' ?
                    <>
                        <p className="modal__text">
                            {effect.short_effect}
                        </p>
                        <p className="modal__text">
                            {effect.effect}
                        </p>
                    </>
                    : null}
                </span>
            ))}
        </>
    </Modal>
    <main className="main">
      <div className="pokemon-main">
        <div className="pokemon-item pokemon-item--height">
          <h1 className="capitalize">{pokemon?.name}</h1>
          <img
            className="pokemon-item__image"
            src={pokemon?.sprites.other?.dream_world?.front_default}
            alt={pokemon?.name}
          />
        </div>
        <div className="pokemon-item pokemon-sprites">
          {[...Object.values(pokemon?.sprites)].map((sprite) => (
            <>
                {typeof sprite === 'string' ?
                    <div key={sprite} className="pokemon-sprites__item">
                        <img className="pokemon-sprites__image" src={sprite} alt={`${pokemon?.name}-back-default`} />
                    </div>
                : null}
            </>
          ))}
        </div>
      </div>
      <div className="pokemon-item pokemon-detail">
        <p className="pokemon-detail__label">Specie</p>
        <p className="pokemon-detail__value">{pokemon?.species.name}</p>
      </div>
      <div className="pokemon-item pokemon-detail">
        <p className="pokemon-detail__label">Experience</p>
        <p className="pokemon-detail__value">{pokemon?.base_experience}</p>
      </div>
      <div className="pokemon-item pokemon-detail">
        <p className="pokemon-detail__label">Height</p>
        <p className="pokemon-detail__value">{pokemon?.height}</p>
      </div>
      <div className="pokemon-item pokemon-detail">
        <p className="pokemon-detail__label">Weight</p>
        <p className="pokemon-detail__value">{pokemon?.weight}</p>
      </div>
      <div className="pokemon-item pokemon-detail pokemon-detail--height pokemon-detail--row">
        <p className="pokemon-detail__label">Characteristics</p>
        <span className="pokemon-detail__values">
          {pokemonCharacteristics?.descriptions?.map((description) => (
              <>
              {description.language.name === 'en' ?
                <p key={description.description} className="pokemon-detail__value">
                {description.description}
                </p>
              :null}
              </>
          ))}
        </span>
      </div>
      <div className="pokemon-item pokemon-detail pokemon-detail--height pokemon-detail--row">
        <p className="pokemon-detail__label">Abilities</p>
        <span className="pokemon-detail__values">
          {pokemon?.abilities?.map((ability) => (
            <p key={ability.ability.name} className="pokemon-detail__chip" onClick={() => getAbilities(ability.ability.url)}>
              {ability.ability.name}
            </p>
          ))}
        </span>
      </div>
      <div className="pokemon-item pokemon-detail pokemon-detail--height pokemon-detail--row">
        <p className="pokemon-detail__label">Forms</p>
        <span className="pokemon-detail__values">
          {pokemon?.forms?.map((form) => (
            <p key={form.name} className="pokemon-detail__value">
              {form.name}
            </p>
          ))}
        </span>
      </div>
      <div className="pokemon-item pokemon-detail pokemon-detail--height pokemon-detail--row">
        <p className="pokemon-detail__label">Items</p>
        <span className="pokemon-detail__values">
          {pokemon?.held_items?.map((item) => (
            <p key={item.item.name} className="pokemon-detail__chip" onClick={() => getItems(item.item.url)}>
              {item.item.name}
            </p>
          ))}
        </span>
      </div>
      <div className="pokemon-item pokemon-detail pokemon-detail--height--full">
        <p className="pokemon-detail__label">Stats</p>
        <div className="pokemon-detail__inner">
            <div className="pokemon-detail__inner-section">
                <span className="pokemon-detail__values">
                <p className="pokemon-detail__title">Moves</p>
                    <p className="pokemon-detail__title">Increase</p>
                    {pokemonStats?.affecting_moves?.increase.map((inc) => (
                        <p key={inc.name} className="pokemon-detail__chip">
                        {inc.move.name}
                        </p>
                    ))}
                </span>
                <span className="pokemon-detail__values">
                    <p className="pokemon-detail__title">Moves</p>
                    <p className="pokemon-detail__title">Decrease</p>
                    {pokemonStats?.affecting_moves?.decrease.map((inc) => (
                        <p key={inc.name} className="pokemon-detail__chip">
                        {inc.move.name}
                        </p>
                    ))}
                </span>
            </div>
            <div className="pokemon-detail__inner-section">
                <span className="pokemon-detail__values">
                    <p className="pokemon-detail__title">Nature</p>
                    <p className="pokemon-detail__title">Increse</p>
                    {pokemonStats?.affecting_natures?.increase.map((inc) => (
                        <p key={inc.name} className="pokemon-detail__chip">
                        {inc.name}
                        </p>
                    ))}
                </span>
                <span className="pokemon-detail__values">
                <p className="pokemon-detail__title">Nature</p>
                <p className="pokemon-detail__title">Decrease</p>
                {pokemonStats?.affecting_natures?.decrease.map((inc) => (
                    <p key={inc.name} className="pokemon-detail__chip">
                    {inc.name}
                    </p>
                ))}
                </span>
            </div>
        </div>
      </div>
    </main>
    </>
  );
};

export default Pokemon;
