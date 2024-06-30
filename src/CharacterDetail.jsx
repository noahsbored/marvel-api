import React, { useEffect, useState } from 'react';
import md5 from 'md5';

const CharacterDetail = ({ characterId }) => {
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const ts = '1';
    const publicKey = '6844622a9f70a43d99efc5f70803549f';
    const privateKey = '6c71b156f9570c13e44e44b693ea5284768431d2';
    const hash = md5(ts + privateKey + publicKey);

    const getcharacterdetail = async () => {
      try {
        const response = await fetch(`https://gateway.marvel.com/v1/public/characters/${characterId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
        const data = await response.json();

        if (data.data && data.data.results && data.data.results.length > 0) {
          setCharacter(data.data.results[0]);
        }
      } catch (error) {
        console.error('Failed to fetch character details:', error);
      }
    };

    if (characterId) {
      getcharacterdetail();
    }
  }, [characterId]);

  return (
    <div>
      {character && (
        <div>
          <h1>{character.name}</h1>
          <p>{character.description || 'yo'}</p>
          <h2>Comics</h2>
          <ul>
            {character.comics.items.map((comic, index) => (
              <li key={index}>{comic.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CharacterDetail;
