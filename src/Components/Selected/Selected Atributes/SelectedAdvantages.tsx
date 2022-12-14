import { useAppSelector } from 'Components/CustomHooks/reduxHooks';
import React from 'react';

const SelectedAdvantages = () => {
  const selectedAdvantages = useAppSelector((state) => state.character.advantages);

  return (
    <ul>
      {selectedAdvantages.map((name) => {
        return (
          <li
            className="selected-advantages"
            key={`${name}-selected`}
            style={{ color: 'seagreen' }}>
            {name}
          </li>
        );
      })}
    </ul>
  );
};

export default SelectedAdvantages;
