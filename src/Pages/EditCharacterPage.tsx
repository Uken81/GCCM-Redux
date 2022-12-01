import React, { useState } from 'react';
import Header from '../Components/Header/Header.component';
import Searchbar from '../Components/Searchbar/SearchBar';
import EditCharacter from '../Components/Toolbar/EditCharacter';
import ResetChanges from '../Components/Toolbar/ResetChanges';
import DisplaySelected from '../Components/Selected/Display Selected/DisplaySelected';
import { usePushBackOnRefresh } from '../Components/CustomHooks/PushBackOnRefresh';
import { useAppSelector } from 'Components/CustomHooks/reduxHooks';

const EditCharacterPage = () => {
  const [combinedAttributesList, setCombinedAttributesList] = useState(
    useAppSelector((state) => [...state.character.advantages, ...state.character.disadvantages])
  );

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
              <ResetChanges setCombinedAttributesList={setCombinedAttributesList} />
              <EditCharacter />
            </div>
          </div>
          <div className="main-interface">
            <Searchbar combinedAttributesList={combinedAttributesList} />
            <DisplaySelected />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCharacterPage;
