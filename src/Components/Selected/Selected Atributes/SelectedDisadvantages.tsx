import { useAppSelector } from 'features/reduxHooks';
import React from 'react';

const SelectedDisadvantages = () => {
  const selectedDisadvantages = useAppSelector((state) => state.character.disadvantages);
  return (
    <ul>
      {selectedDisadvantages.map((name) => {
        return (
          <li className="list-items" key={`${name}-selected`} title={name}>
            {name}
          </li>
        );
      })}
    </ul>
  );
};

export default SelectedDisadvantages;
