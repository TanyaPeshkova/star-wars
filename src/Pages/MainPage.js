import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchFirstPageCharacters, fetchAllCharacters } from '../api/api';
import { setCharacters, addFavorite, setCurrentPage  } from '../store/charactersSlice';
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import '../css/mainPage.css'
import CharacterCard from "../components/CharacterCard";
import Pagination from "../components/Pagination";
import { SlMagnifier } from "react-icons/sl";

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
      const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);
      const handlePageChange = (pageNumber) => {
        dispatch(setCurrentPage(pageNumber));
    };

      return (
        <Layout>
      <h1>Персонажи Звездных Войн</h1>
      <div className="input">
      <input 
        type="text" 
        placeholder="Начните вводить имя" 
        value={search} 
        className="search-field" 
        onChange={(e) => setSearch(e.target.value)} 
      />

      </div>
     
      {loading ? <Spinner /> : (
        <div className="cards">
              <div class="card-container">


        {currentCharacters.map(character => (
           <CharacterCard 
           key={character.name} 
           character={character} 
           onFavorite={handleFavorite} 
       />
       
        ))}
      </div></div>
        )}

      <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
    </Layout>
    )
}

export default MainPage