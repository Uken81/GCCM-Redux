import React from 'react';
import SelectedAdvantages from '../Selected Atributes/SelectedAdvantages';
import SelectedDisadvantages from '../Selected Atributes/SelectedDisadvantages';

import './displaySelected.styles.scss';
import { useAppDispatch } from 'features/reduxHooks';
import { toggleAdvantages, toggleDisadvantages } from 'features/toggleSlice';

const DisplaySelected = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="selected-container">
      <div
        className="selected-list"
        id="selected-advantages"
        onClick={() => dispatch(toggleAdvantages())}>
        <h2>Selected Advantages</h2>
        <SelectedAdvantages />
      </div>
      <div
        className="selected-list"
        id="selected-disadvantages"
        onClick={() => dispatch(toggleDisadvantages())}>
        <h2>Selected Disadvantages</h2>
        <SelectedDisadvantages />
      </div>
    </div>
  );
};

export default DisplaySelected;
