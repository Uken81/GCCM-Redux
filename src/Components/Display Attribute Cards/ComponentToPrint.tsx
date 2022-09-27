import React from 'react';
import { useContext } from 'react';
import { ComponentRefContext } from 'context';
import DisplayAdvantages from './DisplayAdvantages';
import DisplayDisadvantages from './DisplayDisadvantages';

const ComponentToPrint = () => {
  const setComponentRefContext = useContext(ComponentRefContext);
  const setComponentRef = setComponentRefContext?.setComponentRef;

  return (
    <div className="display-container" ref={setComponentRef}>
      <DisplayAdvantages />
      <DisplayDisadvantages />
    </div>
  );
};

export default ComponentToPrint;
