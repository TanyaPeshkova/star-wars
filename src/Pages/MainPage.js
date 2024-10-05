import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchCharacters} from '../api/api';
import { setCharacters, addFavorite,setCurrentPage  } from '../store/charactersSlice';
import Layout from "../components/Layout";


const MainPage = () => {
    const characters = useSelector((state) => state.characters.allCharacters);
    const currentPage = useSelector((state) => state.characters.currentPage);
    const itemsPerPage = useSelector((state) => state.characters.itemsPerPage);
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

      const indexOfLastCharacter = currentPage * itemsPerPage;
      const indexOfFirstCharacter = indexOfLastCharacter - itemsPerPage;
      const currentCharacters = filteredCharacters.slice(indexOfFirstCharacter, indexOfLastCharacter);
    
    return (
        <Layout>
      <h1>Персонажи Звездных Войн</h1>
      <input 
        type="text" 
        placeholder="Search by name" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />
      <div>
        {currentCharacters.map(character => (
          <div key={character.name}>
            <h2>{character.name}</h2>
            <button onClick={() => handleFavorite(character)}>♥️</button>
          </div>
        ))}
      </div>
      <button onClick={() => dispatch(setCurrentPage(currentPage - 1))} disabled={currentPage === 1}>Previous</button>
      <button onClick={() => dispatch(setCurrentPage(currentPage + 1))} disabled={indexOfLastCharacter >= filteredCharacters.length}>Next</button>
    </Layout>
    )
}

export default MainPage