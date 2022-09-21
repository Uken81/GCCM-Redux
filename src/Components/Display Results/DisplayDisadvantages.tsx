import React from 'react';
import { useCharacterStore } from '../../Global State/store';

import './DisplayResults.styles.scss';

const DisplayDisadvantages = () => {
  const characterName = useCharacterStore((state) => state.character.name);
  const selectedDisadvantages = useCharacterStore((state) => state.character.disadvantages);

  const nameText = () => {
    if (characterName) {
      return `${characterName}'s`;
    } else {
      return '';
    }
  };

  return (
    <div>
      {selectedDisadvantages.length > 0 && <h3>{`${nameText()} Disadvantages`}</h3>}
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
