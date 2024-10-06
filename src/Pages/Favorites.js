import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import FavoritesCard from "../components/FavoritesCard"



const Favorites = () => {

    const favorites = useSelector((state)=>state.characters.favorites)
    const dispatch = useDispatch()

    return(
        <Layout>
            <h1>Ваши любимые персонажи</h1>
        <div className="cards">

            <div className="main card-container">
                 {favorites.map(character => (
                <FavoritesCard 
                key={character.name} 
                character={character} 
            />
              
            ))}
            </div></div>
           
        </Layout>
    )
}

export default Favorites;