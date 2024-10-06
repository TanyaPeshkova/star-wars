import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {removeFavorite} from '../store/charactersSlice'
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

const CharacterCard = ({character, onFavorite}) => {
    const favorites = useSelector((state)=>state.characters.favorites)
    const dispatch = useDispatch();
    const isFavorite = favorites.some(char => char.name === character.name);
    const handleRemove = (character) => {
        dispatch(removeFavorite(character));
      };
    return (
        <div className="character_card">
            <h2>{character.name}</h2>
            <button  className={`favorite_button ${isFavorite ? 'active' : ''}`} onClick={()=>{
                if (isFavorite) {
                    handleRemove(character)
                }else {
                    onFavorite(character)
                }
                } }>
                    {isFavorite? 
                    <FaHeart />:
                    <CiHeart/>
                    }
                    </button>
        </div>
    )
}
export default CharacterCard