import React from 'react';
import { AttributeObj } from '../../../types';

interface Props {
  selectedAdvantages?: AttributeObj[];
  selectedDisadvantages?: AttributeObj[];
}

export const DisplayResult = ({ selectedAdvantages, selectedDisadvantages }: Props) => {
  const attributeObjs =
    selectedAdvantages !== undefined ? selectedAdvantages : selectedDisadvantages;

  return (
    <div>
      {attributeObjs?.map(({ title, points, description, subCategories, extraText }) => {
        console.log('attObj', attributeObjs);
        return (
          <div className="results-container" key={`${title}-container`}>
            <h2>{title}</h2>
            <p className="points">
              <strong>{points}</strong>
            </p>
            {description}
            {subCategories &&
              subCategories.map(({ name, text, points }, index) => {
                console.log('sub', index);
                return (
                  <div className="sub-category" key={`${index}-subContainer`}>
                    <strong>{name}</strong>
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
