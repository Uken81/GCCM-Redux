import React, { LegacyRef } from 'react';
import DisplayAdvantages from '../DisplayAdvantages';
import DisplayDisadvantages from '../DisplayDisadvantages';

const ComponentToPrint: React.FC<{ divRef: LegacyRef<HTMLDivElement> | undefined }> = ({
  divRef
}) => {
  return (
    <div className="display-container" ref={divRef}>
      <DisplayAdvantages />
      <DisplayDisadvantages />
    </div>
  );
};

export default ComponentToPrint;
