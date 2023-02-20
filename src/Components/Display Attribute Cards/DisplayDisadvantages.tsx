import DisadvantagesArray from 'Attribute Objects/Disadvantages';
import { useAppSelector } from 'features/reduxHooks';
import React from 'react';
import { DisplayAttributeCards } from './DisplayAttributeCards';

import './DisplayAttributeCards.styles.scss';

const DisplayDisadvantages = () => {
  const characterName = useAppSelector((state) => state.character.name);
  const savedDisadvantages = useAppSelector((state) => state.character.disadvantages);
  const nameText = characterName !== '' ? `${characterName}'s` : '';

  const selectedDisadvantages = DisadvantagesArray.filter((advantageObj) =>
    savedDisadvantages.includes(advantageObj.title)
  );

  return (
    <div>
      {selectedDisadvantages.length > 0 && <h3>{`${nameText} Disadvantages`}</h3>}
      <DisplayAttributeCards selectedDisadvantages={selectedDisadvantages} />
    </div>
  );
};

export default DisplayDisadvantages;
