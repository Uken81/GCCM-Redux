import React, { useState } from 'react';
import { useEffect } from 'react';

import './Toggle.styles.scss';

import { Tab, Tabs } from 'react-bootstrap';
import { useToggleStore } from 'Global State/store';

interface Props {
  setIsChoosingAdvantages: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleAdvantageDisadvantage = ({ setIsChoosingAdvantages }: Props) => {
  const [key, setKey] = useState('advantages');
  const toggleKey = useToggleStore((state) => state.toggleKey);

  //Below function is called when user clicks on columns in DisplaySelected component.
  useEffect(() => {
    toggleKey === 'advantages' ? setKey('advantages') : setKey('disadvantages');
  }, [toggleKey]);

  useEffect(() => {
    key === 'advantages' ? setIsChoosingAdvantages(true) : setIsChoosingAdvantages(false);
  }, [key]);

  return (
    <div className="toggle-container">
      <Tabs
        defaultActiveKey="advantages"
        activeKey={key}
        className="toggle-advantages-disadvantages"
        onSelect={(key) => setKey(key ?? 'advantages')}>
        <Tab
          style={{ backgroundColor: 'red' }}
          eventKey="choose-from"
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
