import React, { useLayoutEffect } from 'react';

import './Toggle.styles.scss';

import { Tab, Tabs } from 'react-bootstrap';
import { useAppDispatch } from 'features/reduxHooks';
import { toggleAdvantages, toggleDisadvantages } from 'features/toggleSlice';

interface Props {
  isChoosingAdvantages: boolean;
}

const ToggleAdvantageDisadvantage = ({ isChoosingAdvantages }: Props) => {
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
        className="toggle-advantages-disadvantages"
        onSelect={handleTabs}>
        <Tab
          style={{ backgroundColor: 'red' }}
          className="tab-disabled"
          title="Choose From"
          disabled
        />
        <Tab eventKey="advantages" title="Advantages" />
        <Tab eventKey="disadvantages" title="Disadvantages" />
      </Tabs>
    </div>
  );
};

export default ToggleAdvantageDisadvantage;
