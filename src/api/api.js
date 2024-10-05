import axios from "axios";

const API_URL = ' https://swapi.dev/api/people';

export const fetchCharacters = async () => {
    try{let allCharacters = [];
    let nextPage = API_URL;

    while (nextPage) {
        const response = await axios.get(nextPage);
        allCharacters = allCharacters.concat(response.data.results);

        nextPage = response.data.next;
    }
    return allCharacters;}
    catch (error) {
        console.log('Ошибка: ', error)
        throw error
    };
    

}

