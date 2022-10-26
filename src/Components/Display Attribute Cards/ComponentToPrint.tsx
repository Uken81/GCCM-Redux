import React, { LegacyRef } from 'react';
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
