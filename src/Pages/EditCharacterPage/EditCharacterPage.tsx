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
    <div className="edit-character-page">
      <Header />
      <div className="user-interface-window">
        <h1 className="main-title"> G.C.C.M </h1>
        <div className="container">
          <EditCharacterToolbar />
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
