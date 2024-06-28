import { useEffect } from 'react';

import md5 from 'md5';
function CharacterDetail({ characterId }) {
  useEffect(() => {
    //const timestamp = new Date().getTime().toString();
    //const publicKey = "6844622a9f70a43d99efc5f70803549f"; 


   
    const ts = '1';
    const publicKey = '6844622a9f70a43d99efc5f70803549f'
    const privateKey = '6c71b156f9570c13e44e44b693ea5284768431d2';
    const hash = md5(ts + privateKey + publicKey);


    const fetchCharacterDetails = async () => {
      const response = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${publicKey}&hash=${hash}`);
      const data = await response.json();


      if (data.data && data.data.results && data.data.results.length > 0) {
        console.log(data.data.results[0]); 
      }
    };

    fetchCharacterDetails();
  }, [characterId]);

  return null; 
}

export default CharacterDetail;
