import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {removeFavorite} from '../store/charactersSlice'


const Favorites = () => {

    const favorites = useSelector((state)=>state.characters.favorites)
    const dispatch = useDispatch()

    const handleRemove = (character) => {
        dispatch(removeFavorite(character))
    }

    return(
        <div>
            {favorites.map(character => (
                <div key={character.name}>
                    <p>
                        {character.name}
                    </p>
                    <button onClick={()=>handleRemove(character)}>Удалить из списка любимых персонажей</button>
                </div>
            ))}
        </div>
    )
}

export default Favorites;