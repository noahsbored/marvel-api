import React, { useEffect, useState } from 'react';
import md5 from 'md5';

const CharacterList = ({ onCharacterSelect }) => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const ts = '1';
    const publicKey = '6844622a9f70a43d99efc5f70803549f';
    const privateKey = '6c71b156f9570c13e44e44b693ea5284768431d2';
    const hash = md5(ts + privateKey + publicKey);

    const fetchCharacters = async () => {
      const response = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
      const data = await response.json();

      if (data.data && data.data.results) {
        setCharacters(data.data.results);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div className="character-list">
      <div className="grid">
        {characters.map(character => (
          <div 
            key={character.id} 
            className="character-card" 
            onClick={() => onCharacterSelect(character.id)}
          >
            <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
            <h3>{character.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterList;
