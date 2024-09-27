import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = (publicKey, hash) =>
    'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=b9057d7e6fa0341e4244c30148cbdb25&hash=215e07d4090545867ddfa3d69f36dc58'

const CharacterList = () => {
    const [characters, setCharacters] = useState([]);

    const PUBLIC_KEY = 'b9057d7e6fa0341e4244c30148cbdb25';
    const HASH = '215e07d4090545867ddfa3d69f36dc58';

    useEffect(() => {
        axios
            .get(API_URL(PUBLIC_KEY, HASH))
            .then((response) => setCharacters(response.data.data.results))
    }, [PUBLIC_KEY, HASH]);

    return (
        <div className='image-grid'>
            {characters.map(({ id, name, thumbnail }) => (
                <div key={id} className='grid-item'>
                    <img
                        src={`${thumbnail.path}.${thumbnail.extension}`}
                        className='image'
                    />
                    <h3>{name}</h3>
                </div>
            ))}
        </div>
    );
};

export default CharacterList;
