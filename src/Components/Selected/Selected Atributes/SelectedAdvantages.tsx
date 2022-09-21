import React from 'react';
import { useCharacterStore } from '../../../Global State/store';

const SelectedAdvantages = () => {
  const selectedAdvantages = useCharacterStore((state) => state.character.advantages);

  return (
    <ul>
      {selectedAdvantages.map((name) => {
        return (
          <li className="selected-advantages" key={`${name}-selected`} style={{ color: 'seagreen' }}>
            {name}
          </li>
        );
      })}
    </ul>
  );
};

export default SelectedAdvantages;
