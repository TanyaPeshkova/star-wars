import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {removeFavorite} from '../store/charactersSlice'
import { RxCross1 } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import {fetchPlanets} from '../api/api';


const FavoritesCard = ({character}) => {
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch()
    
    const handleRemove = (character) => {
        dispatch(removeFavorite(character));
      };
    return (
      <div class="card">
      <img src={character.image} alt="character" style={{width:'100%'}} />
      <div class="container">
          <h4><b>{character.name}</b></h4>
          <p>Родная планета: {character.homeworld}</p>
          <button  className={`favorite_button ${isHovered ? 'active' : ''}`}onClick={()=>handleRemove(character)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)} >
      {isHovered ? <RxCross1 /> : <RxCross2 />}
    </button>
      </div>
      
  </div>

    
    )
}
export default FavoritesCard