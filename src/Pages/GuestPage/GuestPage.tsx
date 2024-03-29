import React, { useRef } from 'react';
import 'Pages/characterPage.styles.scss';

import Header from '../../Components/Header/Header.component';
import Searchbar from '../../Components/SearchBar/Searchbar';
import ComponentToPrint from '../../Components/Display Attribute Cards/ComponentToPrint/ComponentToPrint';
import DisplaySelected from '../../Components/Selected/Display Selected/DisplaySelected';
import { GuestPageToolbar } from './GuestPageToolbar';
import { useAppDispatch } from 'features/reduxHooks';
import { resetCharacter } from 'features/characterSlice';

const GuestPage = () => {
  const divRef = useRef(null);
  const dispatch = useAppDispatch();

  dispatch(resetCharacter());
  return (
    <div className="main-container">
      <Header />
      <h1 className="main-title">G.C.C.M</h1>
      <div className="inner-container">
        <GuestPageToolbar divRef={divRef} />
        <div className="attribute-selection">
          <Searchbar />
        </div>
        <DisplaySelected />
      </div>
      <div className="results-window">
        <ComponentToPrint divRef={divRef} />
      </div>
    </div>
  );
};

export default GuestPage;
