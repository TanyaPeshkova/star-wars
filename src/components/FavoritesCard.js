import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {removeFavorite} from '../store/charactersSlice'
import { FaRegTrashCan } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";


const FavoritesCard = ({character}) => {
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch()
    
    const handleRemove = (character) => {
        dispatch(removeFavorite(character));
      };
    return (
    <div className="character_card">
    <h2>{character.name}</h2>
    <button  className={`favorite_button ${isHovered ? 'active' : ''}`}onClick={()=>handleRemove(character)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)} >
      {isHovered ? <FaTrashAlt /> : <FaRegTrashCan />}
    </button>
</div>
    )
}
export default FavoritesCard