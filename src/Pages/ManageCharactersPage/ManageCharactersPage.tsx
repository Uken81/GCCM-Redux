import React, { useRef, useState } from 'react';
import '../../Components/Display Attribute Cards/DisplayAttributeCards.styles.scss';
import 'Pages/page.styles.scss';

import Header from '../../Components/Header/Header.component';
import DisplaySelected from '../../Components/Selected/Display Selected/DisplaySelected';
import DeleteAlert from '../../Components/Toolbar/DeleteCharacter/DeleteAlert';
import ComponentToPrint from 'Components/Display Attribute Cards/ComponentToPrint/ComponentToPrint';
import { useAppSelector } from 'features/reduxHooks';
import { Navigate } from 'react-router';
import { ManageCharactersToolbar } from './ManageCharactersToolbar';

const ManageCharactersPage = () => {
  const character = useAppSelector((state) => state.character);
  const divRef = useRef(null);
  const [showAlert, setShowAlert] = useState(false);

  if (!character.id) {
    return <Navigate to="/create-or-manage-page" />;
  }

  return (
    <div className="manage-character-page">
      <Header />
      <div className="user-interface-window">
        <h1 className="main-title"> G.C.C.M </h1>
        <div className="container">
          <ManageCharactersToolbar setShowAlert={setShowAlert} divRef={divRef} />
          <div className="main-interface">
            <h1 className="selected-header">{character.name}&apos;s Cheatsheet</h1>
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
