import React from 'react';
import Header from '../../Components/Header/Header.component';
import Searchbar from '../../Components/SearchBar/Searchbar';
import DisplaySelected from '../../Components/Selected/Display Selected/DisplaySelected';
import { useAppSelector } from 'features/reduxHooks';
import { Navigate } from 'react-router';
import { EditCharacterToolbar } from './EditCharacterToolbar';

const EditCharacterPage = () => {
  const character = useAppSelector((state) => state.character);

  if (!character.id) {
    return <Navigate to="/create-or-manage-page" />;
  }

  return (
    <div className="main-container">
      <Header />
      <h1 className="main-title"> G.C.C.M </h1>
      <div className="inner-container">
        <EditCharacterToolbar />
        <div className="attribute-selection">
          <Searchbar />
        </div>
        <DisplaySelected />
      </div>
    </div>
  );
};

export default EditCharacterPage;
