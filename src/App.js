/* eslint-disable react-hooks/exhaustive-deps */
import pokeball from "./pokeball.svg";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./modules/Home";
import Pokemon from "./modules/Pokemon";
import { filterPokemonsList } from './redux/pokemons.slice';
import { useDispatch, useSelector } from "react-redux";
 
function App() {
  const pokemons = useSelector(state => state.pokemons.pokemons);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToTop = () => {
    window.scroll(0, 0);
  }

  const search = async (search) => {
    try{
      const filterPokemon = pokemons.filter((pok) => pok.name.indexOf(search) !== -1);

      dispatch(filterPokemonsList(filterPokemon))
    } catch(error){
      console.error(error);
    };
  };
  return (
    <div className="body">
      <header className="header">
          <img className="header__logo" src={pokeball} alt="react logo" onClick={() => navigate('/')}/>
      </header>
      <nav className="navigation">
        <ul className="navigation__list">
          <li className="navigation__item" onClick={() => navigate('/')}>Home</li>
        </ul>
        <input className="input-search" type="search" onChange={(e) => search(e.target.value)} onFocus={() => navigate('/')}/>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon" element={<Pokemon />} />
      </Routes>
      <img className="button--float" src={pokeball} alt="react logo" onClick={goToTop}/>
    </div>
  );
}

export default App;
