import AdvantagesArray from 'Attribute Objects/Advantages';
import React, { useEffect, useState } from 'react';
import { AttributeObj } from '../../../types';
import { useCharacterStore } from '../../Global State/store';

import './DisplayResults.styles.scss';

const DisplayAdvantages = () => {
  const characterName = useCharacterStore((state) => state.character.name);
  const savedAdvantages = useCharacterStore((state) => state.character.advantages);
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
      {selectedAdvantages.map(({ title, points, description, subCategories, extraText }) => {
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

export default DisplayAdvantages;
