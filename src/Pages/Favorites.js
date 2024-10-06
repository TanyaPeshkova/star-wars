import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {removeFavorite} from '../store/charactersSlice'
import Layout from "../components/Layout";
import FavoritesCard from "../components/FavoritesCard"



const Favorites = () => {

    const favorites = useSelector((state)=>state.characters.favorites)
    const dispatch = useDispatch()

    const handleRemove = (character) => {
        dispatch(removeFavorite(character))
    }
    

    return(
        <Layout>
            <h1>Ваши любимые персонажи</h1>
            <div className="main">
                 {favorites.map(character => (
                <FavoritesCard 
                key={character.name} 
                character={character} 
            />
              
            ))}
            </div>
           
        </Layout>
    )
}

export default Favorites;