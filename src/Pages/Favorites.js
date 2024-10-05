import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {removeFavorite} from '../store/charactersSlice'
import Layout from "../components/Layout";


const Favorites = () => {

    const favorites = useSelector((state)=>state.characters.favorites)
    const dispatch = useDispatch()

    const handleRemove = (character) => {
        dispatch(removeFavorite(character))
    }

    return(
        <Layout>
            {favorites.map(character => (
                <div key={character.name}>
                    <p>
                        {character.name}
                    </p>
                    <button onClick={()=>handleRemove(character)}>Удалить из списка любимых персонажей</button>
                </div>
            ))}
        </Layout>
    )
}

export default Favorites;