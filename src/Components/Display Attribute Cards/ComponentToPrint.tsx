import React, { LegacyRef } from 'react';
// import { useContext } from 'react';
// import { ComponentRefContext } from 'context';
import DisplayAdvantages from './DisplayAdvantages';
import DisplayDisadvantages from './DisplayDisadvantages';

interface Props {
  divRef: LegacyRef<HTMLDivElement> | undefined;
}

const ComponentToPrint = ({ divRef }: Props) => {
  return (
    <div className="display-container" ref={divRef}>
      <DisplayAdvantages />
      <DisplayDisadvantages />
    </div>
  );
};

export default ComponentToPrint;
