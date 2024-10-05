import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchCharacters} from '../api/api';
import { setCharacters, addFavorite } from '../store/charactersSlice';

const MainPage = () => {
    const characters = useSelector((state) => state.characters.allCharacters);
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const loadCharacters = async () => {
          const data = await fetchCharacters(page);
          dispatch(setCharacters(data));
        };
        loadCharacters();
      }, [page, dispatch]);

      const handleFavorite = (character) => {
        dispatch(addFavorite(character));
      };
    
      const filteredCharacters = characters.filter(char => char.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
      <h1>Персонажи Звездных Войн</h1>
      <input 
        type="text" 
        placeholder="Search by name" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />
      <div>
        {filteredCharacters.map(character => (
          <div key={character.name}>
            <h2>{character.name}</h2>
            <button onClick={() => handleFavorite(character)}>♥️</button>
          </div>
        ))}
      </div>
      <button onClick={() => setPage(prev => prev - 1)} disabled={page === 1}>Previous</button>
      <button onClick={() => setPage(prev => prev + 1)}>Next</button>
    </div>
    )
}

export default MainPage