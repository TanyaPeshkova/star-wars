import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {removeFavorite} from '../store/charactersSlice'
import { FaRegTrashCan } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import {fetchPlanets} from '../api/api';


const FavoritesCard = ({character}) => {
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch()
    
    const handleRemove = (character) => {
        dispatch(removeFavorite(character));
      };
    return (
      <div class="card">
      <img src={character.image} alt="Avatar" style={{width:'100%'}} />
      <div class="container">
          <h4><b>{character.name}</b></h4>
          <p>Родная планета: {character.homeworld}</p>
          <button  className={`favorite_button ${isHovered ? 'active' : ''}`}onClick={()=>handleRemove(character)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)} >
      {isHovered ? <FaTrashAlt /> : <FaRegTrashCan />}
    </button>
      </div>
      
  </div>

    
    )
}
export default FavoritesCard