import React from 'react';
import { useCharacterStore } from '../../../Global State/store';

const SelectedDisadvantages = () => {
  const selectedDisadvantages = useCharacterStore((state) => state.character.disadvantages);
  return (
    <ul>
      {selectedDisadvantages.map((name) => {
        return (
          <li
            className="selected-disadvantages"
            key={`${name}-selected`}
            style={{ color: 'brown' }}>
            {name}
          </li>
        );
      })}
    </ul>
  );
};

export default SelectedDisadvantages;
