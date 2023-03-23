import React, { useLayoutEffect } from 'react';

import './Toggle.styles.scss';

import { Tab, Tabs } from 'react-bootstrap';
import { useAppDispatch } from 'features/reduxHooks';
import { toggleAdvantages, toggleDisadvantages } from 'features/toggleSlice';

const ToggleAdvantageDisadvantage: React.FC<{ isChoosingAdvantages: boolean }> = ({
  isChoosingAdvantages
}) => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(toggleAdvantages());
  }, []);

  const handleTabs = (key: string) => {
    key === 'advantages' ? dispatch(toggleAdvantages()) : dispatch(toggleDisadvantages());
  };

  return (
    <div className="toggle-container">
      <Tabs
        defaultActiveKey="advantages"
        activeKey={isChoosingAdvantages ? 'advantages' : 'disadvantages'}
        onSelect={handleTabs}>
        <Tab eventKey="advantages" title="Advantages" />
        <Tab eventKey="disadvantages" title="Disadvantages" />
      </Tabs>
    </div>
  );
};

export default ToggleAdvantageDisadvantage;
