import React, { useRef, useState } from 'react';
import { Form } from 'react-bootstrap';

import '../../Components/Display Attribute Cards/DisplayAttributeCards.styles.scss';
import 'Pages/characterPage.styles.scss';

import Header from '../../Components/Header/Header.component';
import Searchbar from '../../Components/SearchBar/Searchbar';
import DisplaySelected from '../../Components/Selected/Display Selected/DisplaySelected';
import ComponentToPrint from '../../Components/Display Attribute Cards/ComponentToPrint/ComponentToPrint';

import { setName } from '../../features/characterSlice';
import { useAppDispatch } from '../../features/reduxHooks';
import { NewCharacterToolbar } from './NewCharacterToolbar';
import { SaveAlert } from 'Components/Toolbar/SaveCharacter/SaveAlerts';

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
    <div className="main-container">
      <Header />
      <h1 className="main-title">G.C.C.M</h1>
      <div className="inner-container">
        <NewCharacterToolbar setAlertType={setAlertType} divRef={divRef} />
        <div className="attribute-selections">
          <SaveAlert alertType={alertType} setAlertType={setAlertType} />
          <Form className="name-form" onSubmit={handleSubmit} data-testid="form">
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
          <Searchbar />
          <DisplaySelected />
        </div>
      </div>
      <div className="results-window">
        <ComponentToPrint divRef={divRef} />
      </div>
    </div>
  );
};

export default CreateNewCharacterPage;
