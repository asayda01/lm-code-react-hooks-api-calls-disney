
import './App.css';
import React, { useState , useEffect } from 'react';
import Header from './components/header';
import CharacterContainer from './components/character_container';
import Navigation from './components/navigation';
import { DisneyCharacter } from './disney_character';

export const FavouritesContext = React.createContext<number[]>( []);

const App : React.FC = () => {

	const [currentPage, setCurrentPage] = useState<number>(1);

  // Some dummy state representing disney characters
  const [characters, setCharacters] = useState<Array<DisneyCharacter>>([ ]);
  
  // Favouriting a character - / + De-favouriting a character
  const [characterFavourites, setCharacterFavourites] = useState<Array<number>>([]);

  useEffect(() => {
    getCharacters(currentPage);
    console.log("useEffect triggered");
  }, [currentPage]);

  const getCharacters = async (pageNumber : number) => {
    const apiResponse = await fetch(`http://api.disneyapi.dev/characters?page=${pageNumber}`);
    const json = await apiResponse.json() as { data: DisneyCharacter[] };
    setCharacters(json.data);
  };

  return (
    <FavouritesContext.Provider value={characterFavourites}>
      <div className="page">
        <Header currentPage={currentPage} />
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <CharacterContainer characters={characters} updateFavourites={setCharacterFavourites}  />
      </div>
    </FavouritesContext.Provider>
  );
}

export default App;
