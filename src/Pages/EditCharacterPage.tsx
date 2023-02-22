import React from 'react';
import Header from '../Components/Header/Header.component';
import Searchbar from '../Components/SearchBar/Searchbar';
import EditCharacter from '../Components/Toolbar/EditCharacter';
import ResetChanges from '../Components/Toolbar/ResetChanges';
import DisplaySelected from '../Components/Selected/Display Selected/DisplaySelected';
import { useAppSelector } from 'features/reduxHooks';
import { Navigate } from 'react-router';

const EditCharacterPage = () => {
  const character = useAppSelector((state) => state.character);

  if (!character.id) {
    return <Navigate to="/create-or-manage-page" />;
  }

  return (
    <div className="edit-character-page">
      <Header />
      <div className="user-interface-window">
        <h1 className="main-title"> G.C.C.M </h1>
        <div className="container">
          <div className="toolbar-container">
            <span className="toolbar-header">Character Toolbar</span>
            <div className="toolbar-characters">
              <ResetChanges />
              <EditCharacter />
            </div>
          </div>
          <div className="main-interface">
            <Searchbar />
            <DisplaySelected />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCharacterPage;
