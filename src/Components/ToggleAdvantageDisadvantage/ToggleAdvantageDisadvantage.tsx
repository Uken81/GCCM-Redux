import React, { useLayoutEffect } from 'react';

import './Toggle.styles.scss';

import { Tab, Tabs } from 'react-bootstrap';
import { useToggleStore } from 'Global State/store';

interface Props {
  isChoosingAdvantages: boolean;
}

const ToggleAdvantageDisadvantage = ({ isChoosingAdvantages }: Props) => {
  const toggleAdvantages = useToggleStore((state) => state.toggleAdvantages);
  const toggleDisadvantages = useToggleStore((state) => state.toggleDisadvantages);

  useLayoutEffect(() => {
    toggleAdvantages();
  }, []);

  const handleTabs = (key: string) => {
    key === 'advantages' ? toggleAdvantages() : toggleDisadvantages();
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
        <Tab eventKey="advantages" title="Advantages" tabClassName="adTab" />
        <Tab eventKey="disadvantages" title="Disadvantages" />
      </Tabs>
    </div>
  );
};

export default ToggleAdvantageDisadvantage;
