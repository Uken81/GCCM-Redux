import DisadvantagesArray from 'Attribute Objects/Disadvantages';
import React, { useEffect, useState } from 'react';
import { AttributeObj } from '../../../types';
import { useCharacterStore } from '../../Global State/store';
import { DisplayResult } from './DisplayResults';

import './DisplayResults.styles.scss';

const DisplayDisadvantages = () => {
  const characterName = useCharacterStore((state) => state.character.name);
  const savedDisadvantages = useCharacterStore((state) => state.character.disadvantages);
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
      <DisplayResult selectedDisadvantages={selectedDisadvantages} />
    </div>
  );
};

export default DisplayDisadvantages;
