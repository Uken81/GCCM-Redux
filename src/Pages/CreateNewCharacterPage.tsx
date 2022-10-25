import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import '../Components/Display Attribute Cards/DisplayAttributeCards.styles.scss';
import 'Pages/page.styles.scss';

import Header from '../Components/Header/Header.component';
import SearchBar from '../Components/SearchBar/SearchBar';
import CopyToClipboard from '../Components/Toolbar/CopyToClipboard';
import ResetCharacter from '../Components/Toolbar/ResetCharacter';
import DisplaySelected from '../Components/Selected/DisplaySelected';
import ComponentToPrint from '../Components/Display Attribute Cards/ComponentToPrint';

import SuccessfulSaveAlert from '../Components/Toolbar/SuccessfulSaveAlert';
import SaveCharacter from '../Components/Toolbar/SaveCharacter';
import ReactToPrint from 'react-to-print';
import { setName } from '../features/characterSlice';
import { useAppDispatch } from '../Components/CustomHooks/reduxHooks';

const CreateNewCharacterPage = () => {
  const dispatch = useAppDispatch();
  const [nameFormInput, setNameFormInput] = useState<string>('');
  const [showSaveAlert, setShowSaveAlert] = useState(false);

  const divRef = useRef(null);
  const formRef = useRef<HTMLInputElement>(null);

  const handleInput = () => {
    const value = formRef.current?.value ?? '';
    setNameFormInput(value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    dispatch(setName(nameFormInput));
    setNameFormInput('');
  };

  return (
    <div className="App">
      <Header />
      <div className="user-interface-window">
        <h1 className="main-title"> G.C.C.M </h1>
        {showSaveAlert && <SuccessfulSaveAlert setShowSaveAlert={setShowSaveAlert} />}
        <div className="container">
          <div className="toolbar-container">
            <span className="toolbar-header">Character Tools</span>
            <div className="toolbar-characters">
              <ResetCharacter />
              <SaveCharacter setShowSaveAlert={setShowSaveAlert} />
            </div>
            <span className="toolbar-header">Output Tools</span>
            <div className="toolbar-print-options">
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
        <ComponentToPrint divRef={divRef} />
      </div>
    </div>
  );
};

export default CreateNewCharacterPage;
