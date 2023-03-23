import React from 'react';
import '../Display Selected/displaySelected.styles.scss';
import { useAppSelector } from 'features/reduxHooks';

const SelectedAdvantages = () => {
  const selectedAdvantages = useAppSelector((state) => state.character.advantages);

  return (
    <ul>
      {selectedAdvantages.map((name) => (
        <li
          className="list-items"
          key={`${name}-selected`}
          title={name}
          style={{ color: 'seagreen' }}>
          {name}
        </li>
      ))}
    </ul>
  );
};

export default SelectedAdvantages;
