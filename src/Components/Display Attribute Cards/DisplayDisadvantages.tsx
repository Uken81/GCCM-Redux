import DisadvantagesArray from 'Attribute Objects/Disadvantages';
import { useAppSelector } from 'features/reduxHooks';
import React, { useEffect, useState } from 'react';
import { AttributeObj } from '../../../types';
import { DisplayAttributeCards } from './DisplayAttributeCards';

import './DisplayAttributeCards.styles.scss';

const DisplayDisadvantages = () => {
  const characterName = useAppSelector((state) => state.character.name);
  const savedDisadvantages = useAppSelector((state) => state.character.disadvantages);
  const [selectedDisadvantages, setSelectedDisadvantages] = useState<AttributeObj[]>([]);
  const nameText = characterName !== '' ? `${characterName}'s` : '';

  const createDisadvantagesList = () => {
    const advantagesFilter = DisadvantagesArray.filter((advantageObj) => {
      const filteredArr = savedDisadvantages.includes(advantageObj.title);
      return filteredArr;
    });
    setSelectedDisadvantages(advantagesFilter);
  };

  useEffect(() => {
    createDisadvantagesList();
  }, [savedDisadvantages]);

  return (
    <div>
      {selectedDisadvantages.length > 0 && <h3>{`${nameText} Disadvantages`}</h3>}
      <DisplayAttributeCards selectedDisadvantages={selectedDisadvantages} />
    </div>
  );
};

export default DisplayDisadvantages;
