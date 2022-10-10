import { useAppSelector } from 'Components/CustomHooks/reduxHooks';
import React from 'react';

const SelectedDisadvantages = () => {
  const selectedDisadvantages = useAppSelector((state) => state.character.disadvantages);
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
