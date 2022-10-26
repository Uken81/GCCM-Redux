import React, { useRef } from 'react';
import '../Components/Display Attribute Cards/DisplayAttributeCards.styles.scss';
import 'Pages/page.styles.scss';

import Header from '../Components/Header/Header.component';
import CopyToClipboard from '../Components/Toolbar/CopyToClipboard';
import DeleteCharacter from '../Components/Toolbar/DeleteCharacter/DeleteCharacter';
import DisplaySelected from '../Components/Selected/Display Selected/DisplaySelected';
import { useState } from 'react';
import { ToEditCharacter } from '../Components/Header/Navigation Links/navigationLinks';
import DeleteAlert from '../Components/Toolbar/DeleteCharacter/DeleteAlert';
import { usePushBackOnRefresh } from '../Components/CustomHooks/PushBackOnRefresh';
import ComponentToPrint from 'Components/Display Attribute Cards/ComponentToPrint/ComponentToPrint';
import ReactToPrint from 'react-to-print';
import { Button } from 'react-bootstrap';
import { useAppSelector } from 'Components/CustomHooks/reduxHooks';

const ManageCharactersPage = () => {
  const characterName = useAppSelector((state) => state.character.name);
  const divRef = useRef(null);
  const [showAlert, setShowAlert] = useState(false);

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
              <ReactToPrint
                trigger={() => (
                  <Button className="tool-button" size="lg">
                    Download PDF
                  </Button>
                )}
                content={() => divRef.current}
              />
            </div>
          </div>
          <div className="main-interface">
            <h1 className="selected-header">{characterName}&apos;S CHEATSHEET</h1>
            {showAlert && <DeleteAlert setShowAlert={setShowAlert} />}
            <DisplaySelected />
          </div>
        </div>
      </div>
      <div className="results-window" id="results">
        <div style={{ display: 'none' }}>
          <ComponentToPrint divRef={divRef} />
        </div>
      </div>
    </div>
  );
};

export default ManageCharactersPage;
