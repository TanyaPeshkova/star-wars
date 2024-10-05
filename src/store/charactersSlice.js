import { createSlice } from "@reduxjs/toolkit";

const charactersSlice = createSlice({
    name: 'characters',
    initialState: {
        allCharacters:[],
        favorites:JSON.parse(localStorage.getItem('favorites')) || [],
    },
    reducers: {
        setCharacters(state, action) {
            state.allCharacters = action.payload;
        },
        addFavorite(state, action) {
            state.favorites.push(action.payload);
            localStorage.setItem('favorites', JSON.stringify(state.favorites)
            )
        },
        removeFavorite(state, action) {
            state.favorites = state.favorites.filter(character =>
                character.name !== action.payload.name 
             );
             localStorage.setItem('favorites', JSON.stringify(state.favorites))
        },
    }
});

export const {setCharacters, addFavorite, removeFavorite} = charactersSlice.actions;
export default charactersSlice.reducer;