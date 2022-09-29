import React from 'react';
import '../Components/Display Attribute Cards/DisplayAttributeCards.styles.scss';
import 'Pages/page.styles.scss';

import Header from '../Components/Header/Header.component';
import CopyToClipboard from '../Components/Toolbar/CopyToClipboard';
import DeleteCharacter from '../Components/Toolbar/DeleteCharacter/DeleteCharacter';
import PrintPDF from '../Components/Toolbar/printPDF';
import DisplaySelected from '../Components/Selected/DisplaySelected';
import { useState } from 'react';
import { ToEditCharacter } from '../Components/Header/Navigation Links/navigationLinks';
import DeleteAlert from '../Components/Toolbar/DeleteCharacter/DeleteAlert';
import { useCharacterStore } from '../Global State/store';
import { usePushBackOnRefresh } from '../Components/CustomHooks/PushBackOnRefresh';
import ComponentToPrint from 'Components/Display Attribute Cards/ComponentToPrint';

const ManageCharactersPage = () => {
  const characterName = useCharacterStore((state) => state.character.name?.toUpperCase());
  const [showAlert, setShowAlert] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  usePushBackOnRefresh();
  return (
    <div className="manage-character-page">
      <Header />
      <div className="user-interface-window">
        <h1 className="main-title"> G.C.C.M </h1>
        <div className="container">
          <div className="toolbar-container">
            <span className="toolbar-header">Character Toolbar</span>
            <div className="toolbar-characters">
              <ToEditCharacter />
              <DeleteCharacter setShowAlert={setShowAlert} />
            </div>
            <div className="toolbar-print-options">
              <CopyToClipboard />
              <PrintPDF />
            </div>
          </div>
          <div className="main-interface">
            <h1 className="selected-header">{characterName}&apos;S CHEATSHEET</h1>
            {showAlert && (
              <DeleteAlert
                setShowAlert={setShowAlert}
                isDeleting={isDeleting}
                setIsDeleting={setIsDeleting}
              />
            )}
            <DisplaySelected />
          </div>
        </div>
      </div>
      <div className="results-window" id="results">
        <div style={{ display: 'none' }}>
          <ComponentToPrint />
        </div>
      </div>
    </div>
  );
};

export default ManageCharactersPage;
