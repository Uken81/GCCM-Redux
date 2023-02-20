import React from 'react';
import AdvantagesArray from 'Attribute Objects/Advantages';
import { useAppSelector } from 'features/reduxHooks';
import { DisplayAttributeCards } from './DisplayAttributeCards';

import './DisplayAttributeCards.styles.scss';

const DisplayAdvantages = () => {
  const characterName = useAppSelector((state) => state.character.name);
  const savedAdvantages = useAppSelector((state) => state.character.advantages);
  const nameText = characterName !== '' ? `${characterName}'s` : '';

  const selectedAdvantages = AdvantagesArray.filter((advantageObj) =>
    savedAdvantages.includes(advantageObj.title)
  );

  return (
    <div>
      {selectedAdvantages.length > 0 && <h3>{`${nameText} Advantages`}</h3>}
      <DisplayAttributeCards selectedAdvantages={selectedAdvantages} />
    </div>
  );
};

export default DisplayAdvantages;
