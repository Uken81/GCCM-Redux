import { useAppSelector } from 'features/reduxHooks';
import React from 'react';

const SelectedDisadvantages = () => {
  const selectedDisadvantages = useAppSelector((state) => state.character.disadvantages);
  return (
    <ul>
      {selectedDisadvantages.map((name) => (
        <li className="list-items" key={`${name}-selected`} title={name} style={{ color: 'brown' }}>
          {name}
        </li>
      ))}
    </ul>
  );
};

export default SelectedDisadvantages;
