import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchFirstPageCharacters, fetchAllCharacters } from '../api/api';
import { setCharacters, addFavorite, setCurrentPage  } from '../store/charactersSlice';
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import '../css/mainPage.css'
import CharacterCard from "../components/CharacterCard";

const MainPage = () => {
    const characters = useSelector((state) => state.characters.allCharacters);
    const currentPage = useSelector((state) => state.characters.currentPage);
    const itemsPerPage = useSelector((state) => state.characters.itemsPerPage);
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [loading, setLoading]  = useState(true);
    useEffect(() => {
        const loadCharacters = async () => {
          const data = await fetchFirstPageCharacters(page);
          dispatch(setCharacters(data));
          setLoading(false);

          const allCharacters  = await fetchAllCharacters();
          dispatch(setCharacters(allCharacters));

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
      {loading ? <Spinner /> : (
      <div>

        {currentCharacters.map(character => (
           <CharacterCard 
           key={character.name} 
           character={character} 
           onFavorite={handleFavorite} 
       />
       
        ))}
      </div>
        )}
      <button onClick={() => dispatch(setCurrentPage(currentPage - 1))} disabled={currentPage === 1}>Previous</button>
      <button onClick={() => dispatch(setCurrentPage(currentPage + 1))} disabled={indexOfLastCharacter >= filteredCharacters.length}>Next</button>
    </Layout>
    )
}

export default MainPage