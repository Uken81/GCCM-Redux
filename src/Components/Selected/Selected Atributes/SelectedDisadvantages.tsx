import React from 'react';
import { useCharacterStore } from '../../../Global State/store';

const SelectedDisadvantages = () => {
  const selectedDisadvantages = useCharacterStore((state) => state.character.selectedDisadvantages);
  return (
    <ul>
      {selectedDisadvantages.map(({ title }) => {
        return (
          <li className="selected" key={`${title}-selected`} style={{ color: 'brown' }}>
            {title}
          </li>
        );
      })}
    </ul>
  );
};

export default SelectedDisadvantages;
