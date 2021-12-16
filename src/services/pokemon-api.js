export const getPokemons = async (page) => {
    const URLApi = page !== '' ? page : 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1118';
    try {
        const res =  await fetch(URLApi);
        const json = await res.json();
        return json;
    }catch(error) {
        return error;
    };
};

export const getPokemon = async (pokemonId) => {
    try {
        const res =  await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const json = await res.json();
        return json;
    }catch(error) {
        return error;
    };
};

export const getPokemonCharact = async (pokemonId) => {
    try {
        const res =  await fetch(`https://pokeapi.co/api/v2/characteristic/${pokemonId}`);
        const json = await res.json();
        return json;
    }catch(error) {
        return error;
    };
};

export const getPokemonStats = async (pokemonId) => {
    try {
        const res =  await fetch(`https://pokeapi.co/api/v2/stat/${pokemonId}`);
        const json = await res.json();
        return json;
    }catch(error) {
        return error;
    };
};

export const getAbility = async (abilityUrl) => {
    try {
        const res =  await fetch(abilityUrl);
        const json = await res.json();
        return json;
    }catch(error) {
        return error;
    };
};

export const getItem = async (itemUrl) => {
    try {
        const res =  await fetch(itemUrl);
        const json = await res.json();
        return json;
    }catch(error) {
        return error;
    };
};