import React, { useState } from 'react';
import CharacterList from './CharacterList';
import CharacterDetail from './CharacterDetail';

function App() {
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  return (
    <div className="App">
      <CharacterList onCharacterSelect={setSelectedCharacterId} />
      {selectedCharacterId && <CharacterDetail characterId={selectedCharacterId} />}
    </div>
  );
}

export default App;
