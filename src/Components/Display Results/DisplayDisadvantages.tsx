import DisadvantagesArray from 'Attribute Objects/Disadvantages';
import React, { useEffect, useState } from 'react';
import { AttributeObj } from '../../../types';
import { useCharacterStore } from '../../Global State/store';

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
      {selectedDisadvantages.map(({ title, points, description, subCategories, extraText }) => {
        return (
          <div className="results-container" key={`${title}-container`}>
            <h2>{title}</h2>
            <p className="points">
              <strong>{points}</strong>
            </p>
            {description}
            {subCategories &&
              subCategories.map(({ name, text, points }) => {
                return (
                  <div className="sub-category" key={`${name}-subContainer`}>
                    <strong>
                      <p>{name}</p>
                    </strong>
                    {text}
                    <p>
                      <strong>{points}</strong>
                    </p>
                  </div>
                );
              })}
            <i>{extraText}</i>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayDisadvantages;
