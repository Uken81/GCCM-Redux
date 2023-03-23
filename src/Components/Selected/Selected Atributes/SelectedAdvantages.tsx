import React from 'react';
import '../Display Selected/displaySelected.styles.scss';
import { useAppSelector } from 'features/reduxHooks';

const SelectedAdvantages = () => {
  const selectedAdvantages = useAppSelector((state) => state.character.advantages);

  return (
    // <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
    <ul>
      {selectedAdvantages.map((name) => {
        return (
          <li className="list-items" key={`${name}-selected`} title={name}>
            {name}
          </li>
        );
      })}
    </ul>
  );
};

export default SelectedAdvantages;
