import AdvantagesArray from 'Attribute Objects/Advantages';
import { useAppSelector } from 'features/reduxHooks';
import React, { useEffect, useState } from 'react';
import { AttributeObj } from '../../../types';
import { DisplayAttributeCards } from './DisplayAttributeCards';

import './DisplayAttributeCards.styles.scss';

const DisplayAdvantages = () => {
  const characterName = useAppSelector((state) => state.character.name);
  const savedAdvantages = useAppSelector((state) => state.character.advantages);
  const [selectedAdvantages, setSelectedAdvantages] = useState<AttributeObj[]>([]);
  const nameText = characterName !== '' ? `${characterName}'s` : '';

  const listAdvantagesToDisplay = () => {
    const advantagesFilter = AdvantagesArray.filter((advantageObj) => {
      const filteredArr = savedAdvantages.includes(advantageObj.title);
      return filteredArr;
    });
    setSelectedAdvantages(advantagesFilter);
  };

  useEffect(() => {
    listAdvantagesToDisplay();
  }, [savedAdvantages]);

  return (
    <div>
      {selectedAdvantages.length > 0 && <h3>{`${nameText} Advantages`}</h3>}
      <DisplayAttributeCards selectedAdvantages={selectedAdvantages} />
    </div>
  );
};

export default DisplayAdvantages;
