import React from 'react';
import { useContext } from 'react';
import { ComponentRefContext, ComponentRefContextInterface } from 'context';
import DisplayAdvantages from './DisplayAdvantages';
import DisplayDisadvantages from './DisplayDisadvantages';

const ComponentToPrint = () => {
  const { setComponentRef } = useContext(ComponentRefContext) as ComponentRefContextInterface;

  return (
    <div className="display-container" ref={setComponentRef}>
      <DisplayAdvantages />
      <DisplayDisadvantages />
    </div>
  );
};

export default ComponentToPrint;
