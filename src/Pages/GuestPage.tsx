import React, { useRef } from 'react';
import 'Pages/page.styles.scss';

import Header from '../Components/Header/Header.component';
import SearchBar from '../Components/SearchBar/SearchBar';
import CopyToClipboard from '../Components/Toolbar/CopyToClipboard';
import ResetCharacter from '../Components/Toolbar/ResetCharacter';
import ComponentToPrint from '../Components/Display Attribute Cards/ComponentToPrint';
import DisplaySelected from '../Components/Selected/DisplaySelected';
import ReactToPrint from 'react-to-print';
import { Button } from 'react-bootstrap';

const GuestPage = () => {
  const divRef = useRef(null);
  return (
    <div className="guest-page">
      <Header />
      <div className="user-interface-window">
        <h1 className="main-title"> G.C.C.M </h1>
        <div className="container">
          <div className="toolbar-container">
            <div className="toolbar-characters">
              <ResetCharacter />
              <ReactToPrint
                trigger={() => (
                  <Button className="tool-button" size="lg">
                    Download PDF
                  </Button>
                )}
                content={() => divRef.current}
              />
              <CopyToClipboard />
            </div>
          </div>
          <div className="main-interface">
            <SearchBar />
            <DisplaySelected />
          </div>
        </div>
      </div>
      <div className="results-window" id="results">
        <ComponentToPrint divRef={divRef} />
      </div>
    </div>
  );
};

export default GuestPage;
