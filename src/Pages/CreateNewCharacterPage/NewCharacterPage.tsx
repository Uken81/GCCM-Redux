import React, { useRef, useState } from 'react';
import { Form } from 'react-bootstrap';

import '../../Components/Display Attribute Cards/DisplayAttributeCards.styles.scss';
import 'Pages/page.styles.scss';

import Header from '../../Components/Header/Header.component';
import Searchbar from '../../Components/SearchBar/Searchbar';
import DisplaySelected from '../../Components/Selected/Display Selected/DisplaySelected';
import ComponentToPrint from '../../Components/Display Attribute Cards/ComponentToPrint/ComponentToPrint';

import { setName } from '../../features/characterSlice';
import { useAppDispatch } from '../../features/reduxHooks';
import { DisplayAlert } from 'Components/Toolbar/SaveCharacter/SaveAlerts/displayAlert';
import { NewCharacterToolbar } from './NewCharacterToolbar';

const CreateNewCharacterPage = () => {
  const dispatch = useAppDispatch();
  const [nameFormInput, setNameFormInput] = useState<string>('');
  const [alertType, setAlertType] = useState('');
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
        <DisplayAlert alertType={alertType} setAlertType={setAlertType} />
        <div className="container">
          <NewCharacterToolbar setAlertType={setAlertType} divRef={divRef} />
          <div className="main-interface">
            <div className="form">
              <Form className="new-name-form" onSubmit={handleSubmit} data-testid="form">
                <Form.Control
                  type="text"
                  name="character-name-form"
                  aria-label="character-name-form"
                  ref={formRef}
                  value={nameFormInput}
                  onChange={handleInput}
                  placeholder="Enter New Character Name..."
                  size="lg"
                  maxLength={20}
                />
              </Form>
            </div>
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

export default CreateNewCharacterPage;
