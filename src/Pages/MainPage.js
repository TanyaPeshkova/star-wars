import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchFirstPageCharacters, fetchCharactersByName ,fetchCharactersByGender } from '../api/api';
import { setCharacters, addFavorite, setCurrentPage  } from '../store/charactersSlice';
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import '../css/mainPage.css'
import CharacterCard from "../components/CharacterCard";
import Pagination from "../components/Pagination";
import GenderFilter from "../components/GenderFilter";


const MainPage = () => {
    const characters = useSelector((state) => state.characters.allCharacters);
    const currentPage = useSelector((state) => state.characters.currentPage);
    const itemsPerPage = useSelector((state) => state.characters.itemsPerPage);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [loading, setLoading]  = useState(true);
    const [page, setPage]  = useState(1);
    const [genderFilter, setGenderFilter] = useState('');

    useEffect(() => {
      const loadCharacters = async () => {
        setLoading(true);
          if (search.trim() !== '') {
            const data = await fetchCharactersByName(search);
            dispatch(setCharacters(data));
        } 
        else if (genderFilter !== ''){
          const data = await await fetchCharactersByGender(genderFilter);;
          dispatch(setCharacters(data));
        } 
        else {
            const data = await fetchFirstPageCharacters(page);
            dispatch(setCharacters(data));
        }
          setLoading(false);

      };
      loadCharacters();
  }, [genderFilter, search,page,dispatch]);

  const handleFavorite = (character) => {
      dispatch(addFavorite(character));
  };
  const handlePageChange = (currentPage) => {
    dispatch(setCurrentPage(currentPage));
    setPage(currentPage)
};

  const filteredCharacters = characters.filter(char => 
      char.name.toLowerCase().includes(search.toLowerCase())  
  );
  const totalPages = Math.ceil(82 / itemsPerPage);

  
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

<GenderFilter
                    value={genderFilter}
                    onChange={setGenderFilter}
                />
      </div>
     
      {loading ? <Spinner /> : (
        <div className="cards">
              <div className="card-container">


        {filteredCharacters .map(character => (
           <CharacterCard 
           key={character.name} 
           character={character} 
           onFavorite={handleFavorite} 
       />
       
        ))}
      </div></div>
        )}
{genderFilter === ''?<Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />: (
              <div></div>
            )
            }
      
    </Layout>
    )
}

export default MainPage