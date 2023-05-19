import React from 'react';

import { useAppDispatch } from 'features/reduxHooks';
import { toggleAdvantages, toggleDisadvantages } from 'features/toggleSlice';
import { SelectedAttributes } from './SelectedAttributes';

const DisplaySelected = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="selected-container">
      <div className="selected-list" onClick={() => dispatch(toggleAdvantages())}>
        <SelectedAttributes attributeType="advantages" />
      </div>
      <div className="selected-list" onClick={() => dispatch(toggleDisadvantages())}>
        <SelectedAttributes attributeType="disadvantages" />
      </div>
    </div>
  );
};

export default DisplaySelected;
