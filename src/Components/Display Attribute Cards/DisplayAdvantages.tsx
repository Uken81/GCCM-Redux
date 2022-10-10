import AdvantagesArray from 'Attribute Objects/Advantages';
import { useAppSelector } from 'Components/CustomHooks/reduxHooks';
import React, { useEffect, useState } from 'react';
import { AttributeObj } from '../../../types';
import { DisplayResult } from './DisplayAttributeCards';

import './DisplayAttributeCards.styles.scss';

const DisplayAdvantages = () => {
  const characterName = useAppSelector((state) => state.character.name);
  const savedAdvantages = useAppSelector((state) => state.character.advantages);
  const [selectedAdvantages, setSelectedAdvantages] = useState<AttributeObj[]>([]);
  const nameText = characterName !== '' ? `${characterName}'s` : '';

  const createAdvantagesList = () => {
    const advantagesFilter = AdvantagesArray.filter((advantageObj) => {
      const filteredArr = savedAdvantages.includes(advantageObj.title);
      return filteredArr;
    });
    setSelectedAdvantages(advantagesFilter);
  };

  useEffect(() => {
    createAdvantagesList();
  }, [savedAdvantages]);

  return (
    <div>
      {selectedAdvantages.length > 0 && <h3>{`${nameText} Advantages`}</h3>}
      <DisplayResult selectedAdvantages={selectedAdvantages} />
    </div>
  );
};

export default DisplayAdvantages;
