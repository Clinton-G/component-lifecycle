import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = (characterId, publicKey, hash) =>
    `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=1&apikey=${publicKey}&hash=${hash}`;

    const CharacterList = () => {
    const [characters, setCharacters] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const PUBLIC_KEY = 'b9057d7e6fa0341e4244c30148cbdb25';
    const HASH = '215e07d4090545867ddfa3d69f36dc58';

    useEffect(() => {
        axios
            .get(API_URL('', PUBLIC_KEY, HASH))
            .then((response) => setCharacters(response.data.data.results))
            .catch((error) => console.error(error));
    }, [PUBLIC_KEY, HASH]);

    const fetchCharacterDetails = (characterId) => {
        axios
            .get(API_URL(characterId, PUBLIC_KEY, HASH))
            .then((response) => setSelectedCharacter(response.data.data.results[0]))
            .catch((error) => console.error(error));
    };

    return (
        <div>
            <div className='image-grid'>
                {characters.map(({ id, name, thumbnail }) => (
                    <div key={id} className='grid-item' onClick={() => fetchCharacterDetails(id)}>
                        <img
                            src={`${thumbnail.path}.${thumbnail.extension}`}
                            className='image'
                        />
                        <h3>{name}</h3>
                    </div>
                ))}
            </div>

            {selectedCharacter && <CharacterDetail character={selectedCharacter} />}
        </div>
    );
};

const CharacterDetail = ({ character }) => {
    const { name, description, comics } = character;

    return (
        <div className='character-detail'>
            <h2>{name}</h2>
            <p>{description ? description : 'No description available.'}</p>
            <h3>List of Associated Comics:</h3>
            <ul>
                {comics.items.map((comic, index) => (
                    <li key={index}>{comic.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CharacterList;
