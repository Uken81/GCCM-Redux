import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';

import '../Components/Display Attribute Cards/DisplayResults.styles.scss';
import 'Pages/page.styles.scss';

import Header from '../Components/Header/Header.component';
import SearchBar from '../Components/SearchBar/SearchBar';
import CopyToClipboard from '../Components/Toolbar/CopyToClipboard';
import PrintPDF from '../Components/Toolbar/printPDF';
import ResetCharacter from '../Components/Toolbar/ResetCharacter';
import DisplaySelected from '../Components/Selected/DisplaySelected';
import ComponentToPrint from '../Components/Display Attribute Cards/ComponentToPrint';

import { useCharacterStore, useToggleStore } from '../Global State/store';
import SuccessfulSaveAlert from '../Components/Toolbar/SuccessfulSaveAlert';
import SaveCharacter from '../Components/Toolbar/SaveCharacter';

const CreateNewCharacterPage = () => {
  const showSuccessAlert = useToggleStore((state) => state.showSuccessAlert);

  const [nameFormInput, setNameFormInput] = useState<string>('');
  const setName = useCharacterStore((state) => state.addName);

  const formRef = useRef<HTMLInputElement>(null);

  const handleInput = () => {
    const value = formRef.current?.value ?? '';
    setNameFormInput(value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setName(nameFormInput);
    setNameFormInput('');
  };

  return (
    <div className="App">
      <Header />
      <div className="user-interface-window">
        <h1 className="main-title"> G.C.C.M </h1>
        {showSuccessAlert && <SuccessfulSaveAlert />}
        <div className="container">
          <div className="toolbar-container">
            <span className="toolbar-header">Character Tools</span>
            <div className="toolbar-characters">
              <ResetCharacter />
              <SaveCharacter />
            </div>
            <span className="toolbar-header">Output Tools</span>
            <div className="toolbar-print-options">
              <PrintPDF />
              <CopyToClipboard />
            </div>
          </div>
          <div className="main-interface">
            <div className="form">
              <Form className="new-name-form" onSubmit={handleSubmit}>
                <Form.Control
                  type="text"
                  ref={formRef}
                  value={nameFormInput}
                  onChange={handleInput}
                  placeholder="Enter New Character Name..."
                  size="lg"
                  maxLength={20}
                />
              </Form>
            </div>
            <SearchBar />
            <DisplaySelected />
          </div>
        </div>
      </div>
      <div className="results-window" id="results">
        <ComponentToPrint />
      </div>
    </div>
  );
};

export default CreateNewCharacterPage;
