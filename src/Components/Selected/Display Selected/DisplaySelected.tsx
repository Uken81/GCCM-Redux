import React from 'react';

import './displaySelected.styles.scss';
import { useAppDispatch } from 'features/reduxHooks';
import { toggleAdvantages, toggleDisadvantages } from 'features/toggleSlice';
import { SelectedAttributes } from './SelectedAttributes';

const DisplaySelected = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="selected-container">
      <div
        className="selected-list"
        id="selected-advantages"
        onClick={() => dispatch(toggleAdvantages())}>
        <SelectedAttributes attributeType="advantages" />
      </div>
      <div
        className="selected-list"
        id="selected-disadvantages"
        onClick={() => dispatch(toggleDisadvantages())}>
        <SelectedAttributes attributeType="disadvantages" />
      </div>
    </div>
  );
};

export default DisplaySelected;
