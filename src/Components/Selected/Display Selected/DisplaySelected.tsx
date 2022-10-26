import React from 'react';
import SelectedAdvantages from '../Selected Atributes/SelectedAdvantages';
import SelectedDisadvantages from '../Selected Atributes/SelectedDisadvantages';

import './displaySelected.styles.scss';
import { useAppDispatch } from 'Components/CustomHooks/reduxHooks';
import { toggleAdvantages, toggleDisadvantages } from 'features/toggleSlice';

const DisplaySelected = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="selected-window">
      <div
        className="selected-list"
        id="selected-advantages"
        onClick={() => dispatch(toggleAdvantages())}>
        <h1 style={{ color: 'seagreen' }}>Selected Advantages</h1>
        <SelectedAdvantages />
      </div>
      <div
        className="selected-list"
        id="selected-disadvantages"
        onClick={() => dispatch(toggleDisadvantages())}>
        <h1 style={{ color: 'brown' }}>Selected Disadvantages</h1>
        <SelectedDisadvantages />
      </div>
    </div>
  );
};

export default DisplaySelected;
