import axios from "axios";

const API_URL = ' https://swapi.dev/api/people';


export const fetchFirstPageCharacters = async (page) => {
    try {
        const response = await axios.get(`${API_URL}?page=${page}`);
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


export const fetchCharactersByName = async (name) => {
    try {
        const response = await axios.get(`${API_URL}/?search=${name}`);
        
        const characters = await Promise.all(
            
            response.data.results.map(async (character) => {
                const homeworldResponse = await axios.get(character.homeworld);
                return {
                    ...character,
                    homeworld: homeworldResponse.data.name,
                    image: 'https://starwars-visualguide.com/assets/img/characters/' +
                        character.url.replace('https://swapi.dev/api/people/', '').replace('/', "") + ".jpg"
                };
            })
        );
        return characters;
    } catch (error) {
        console.log('Ошибка при поиске персонажей: ', error);
        throw error;
    }
}

export const fetchAllCharacters = async () => {
    try {
        let allCharacters = [];
        let nextPage = API_URL;

        while (nextPage) {
            const response = await axios.get(nextPage);

            const charactersWithHomeworld = await Promise.all(
                response.data.results.map(async (character) => {
                    const homeworldResponse = await axios.get(character.homeworld);
                    return {
                        ...character,
                        homeworld: homeworldResponse.data.name,
                        image: 'https://starwars-visualguide.com/assets/img/characters/' +
                            character.url.replace('https://swapi.dev/api/people/', '').replace('/', "") + ".jpg"
                    };
                })
            );

            allCharacters = allCharacters.concat(charactersWithHomeworld);
            nextPage = response.data.next;
        }

        return allCharacters;
    } catch (error) {
        console.log('Ошибка при загрузке всех персонажей: ', error);
        throw error;
    }
};

export const fetchCharactersByGender = async (gender) => {
    try {
        const allCharacters = await fetchAllCharacters();
        return allCharacters.filter(character => character.gender === gender);
    } catch (error) {
        console.log('Ошибка при фильтрации персонажей по полу: ', error);
        throw error;
    }
};