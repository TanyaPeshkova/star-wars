import axios from "axios";

const API_URL = ' https://swapi.dev/api/people';


export const fetchFirstPageCharacters = async () => {
    try {
        const response = await axios.get(API_URL);
        const characters = await Promise.all(
            response.data.results.map(async (character) => {

                const homeworldResponse = await axios.get(character.homeworld);
                return {
                    ...character,
                    homeworld: homeworldResponse.data.name,
                    image: ' https://starwars-visualguide.com/assets/img/characters/'+
                    character.url.replace('https://swapi.dev/api/people/','').replace('/','')+".jpg"
                };
            })
        );
        return characters;
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
            const characters = await Promise.all(
                response.data.results.map(async (character) => {
                    const homeworldResponse = await axios.get(character.homeworld);
                    return {
                        ...character,
                        homeworld: homeworldResponse.data.name,
                        image: ' https://starwars-visualguide.com/assets/img/characters/'+
                    character.url.replace('https://swapi.dev/api/people/','').replace('/','')+".jpg"
                    };
                })
            );
            allCharacters = allCharacters.concat(characters);
            nextPage = response.data.next;
        }

        return allCharacters;
    } catch (error) {
        console.log('Ошибка при загрузке всех страниц: ', error);
        throw error;
    }
};
