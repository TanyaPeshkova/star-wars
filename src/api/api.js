import axios from "axios";

const API_URL = ' https://swapi.dev/api/people';

export const fetchFirstPageCharacters = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.results;
    } catch (error) {
        console.log('Ошибка при загрузке первой страницы: ', error);
        throw error;
    }
};


export const fetchAllCharacters = async () => {
    try {
        let allCharacters = [];
        let nextPage = API_URL;

        while (nextPage) {
            const response = await axios.get(nextPage);
            allCharacters = allCharacters.concat(response.data.results);
            nextPage = response.data.next;
        }

        return allCharacters;
    } catch (error) {
        console.log('Ошибка при загрузке всех страниц: ', error);
        throw error;
    }
};

