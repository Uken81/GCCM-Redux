<<<<<<< HEAD
import React from 'react';
import { useContext } from 'react';
import { ComponentRefContext } from 'context';
=======
import React, { Context } from 'react';
import { useContext } from 'react';
import { ComponentRefContext, ComponentRefContextInterface } from 'context';
>>>>>>> telmo
import DisplayAdvantages from './DisplayAdvantages';
import DisplayDisadvantages from './DisplayDisadvantages';

const ComponentToPrint = () => {
  const { setComponentRef } = useContext<any>(ComponentRefContext);

  return (
    <div className="display-container" ref={setComponentRef}>
      <DisplayAdvantages />
      <DisplayDisadvantages />
    </div>
  );
};

export default ComponentToPrint;
