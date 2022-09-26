import React from 'react';
import Header from '../Components/Header/Header.component';
import SearchBar from '../Components/SearchBar/SearchBar';
import EditCharacter from '../Components/Toolbar/EditCharacter';
import ResetChanges from '../Components/Toolbar/ResetChanges';
import DisplaySelected from '../Components/Selected/DisplaySelected';
import usePushBackOnRefresh from '../Components/CustomHooks/PushBackOnRefresh';
import { useCharacterStore } from 'Global State/store';

const EditCharacterPage = () => {
  const combinedAttributesList = useCharacterStore((state) => [
    ...state.character.advantages,
    ...state.character.disadvantages
  ]);
  usePushBackOnRefresh();
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
            <SearchBar combinedAttributeList={combinedAttributesList} />
            <DisplaySelected />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCharacterPage;
