import { useAppSelector } from 'features/reduxHooks';
import React from 'react';

const SelectedAdvantages = () => {
  const selectedAdvantages = useAppSelector((state) => state.character.advantages);

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <ul>
        {selectedAdvantages.map((name) => {
          return (
            <li
              className="selected-advantages"
              key={`${name}-selected`}
              style={{ color: 'seagreen', listStyle: 'outside' }}
              title={name}>
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SelectedAdvantages;
