import { createSlice, current } from "@reduxjs/toolkit";

const charactersSlice = createSlice({
    name: 'characters',
    initialState: {
        allCharacters:[],
        favorites:JSON.parse(localStorage.getItem('favorites')) || [],
        currentPage:1,
        itemsPerPage: 10,
    },
    reducers: {
        setCharacters(state, action) {
            state.allCharacters = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
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

export const {setCharacters, addFavorite, removeFavorite,setCurrentPage} = charactersSlice.actions;
export default charactersSlice.reducer;