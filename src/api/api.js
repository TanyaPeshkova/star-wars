import axios from "axios";

const API_URL = ' https://swapi.dev/api/people';

export const fetchCharacters = async (page = 1 ) => {
    const response = await axios.get(`${API_URL}?page=${page}`);
    return response.data.results;
}

