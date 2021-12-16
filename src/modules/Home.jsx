/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from 'react';
import { getPokemons } from '../services/pokemon-api';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setPokemonsList } from '../redux/pokemons.slice'

const Home = () => {
    const pokemons = useSelector(state => state.pokemons.pokemonsFilter);
    const dispatch = useDispatch();
    const [nextPage, setNextPage] = useState("");
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);

    const pokemonList = useMemo(() => {
        const firstElement = (currentPage - 1) * 20;
        const lastElement = firstElement + 20;
        return pokemons.slice(0, lastElement);
    }, [currentPage, pokemons]);

    const getPokemonsList = async () => {
        try {
            const res = await getPokemons(nextPage);
            const pokemonsList = res.results.map((result) => {
                return {
                    name: result.name,
                    id: result.url.split("/")[6],
                    url: result.url,
                };
            });
            dispatch(setPokemonsList([...pokemons, ...pokemonsList]))
            setNextPage(res.next);
        } catch (error) {
            console.error(error);
        }
    };

    const navigateTo = (pokemonId) => {
        navigate({
            pathname: '/pokemon',
            search: `id=${pokemonId}`
        })
    }

    useEffect(() => {
        if(pokemons.length === 0) {
            getPokemonsList();
        }
    }, []);
    return (
        <main className="main">
            {pokemonList?.map((pokemon, index) => (
                <div key={pokemon.id} className="pokemon-item" onClick={() => navigateTo(pokemon.id)}>
                    <img
                        className="pokemon-item__image"
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                        alt={pokemon.name}
                    />
                    <p className="pokemon-item__title">{pokemon.name}</p>
                </div>
            ))}
            <button className='button' onClick={() => setCurrentPage(currentPage + 1)}>Ver Más</button>
        </main>
    );
};

export default Home;
