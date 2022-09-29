import React, { useEffect, useRef } from 'react';
import { useContext } from 'react';
import { ComponentRefContext } from 'context';
import DisplayAdvantages from './DisplayAdvantages';
import DisplayDisadvantages from './DisplayDisadvantages';

const ComponentToPrint = () => {
  const componentRefContext = useContext(ComponentRefContext);
  const componentRef = componentRefContext?.componentRef;
  const setComponentRef = componentRefContext?.setComponentRef;

  const divRef = useRef();

  useEffect(() => {
    setComponentRef(divRef);
  }, []);

  return (
    <div className="display-container" ref={componentRef}>
      <DisplayAdvantages />
      <DisplayDisadvantages />
    </div>
  );
};

export default ComponentToPrint;
