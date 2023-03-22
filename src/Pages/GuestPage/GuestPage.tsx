import React, { useRef } from 'react';
import 'Pages/page.styles.scss';

import Header from '../../Components/Header/Header.component';
import Searchbar from '../../Components/SearchBar/Searchbar';
import ComponentToPrint from '../../Components/Display Attribute Cards/ComponentToPrint/ComponentToPrint';
import DisplaySelected from '../../Components/Selected/Display Selected/DisplaySelected';
import { GuestPageToolbar } from './GuestPageToolbar';

const GuestPage = () => {
  const divRef = useRef(null);
  return (
    <div className="guest-page">
      <Header />
      <div className="user-interface-window">
        <h1 className="main-title"> G.C.C.M </h1>
        <div className="container">
          <GuestPageToolbar divRef={divRef} />
          <div className="main-interface">
            <Searchbar />
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
