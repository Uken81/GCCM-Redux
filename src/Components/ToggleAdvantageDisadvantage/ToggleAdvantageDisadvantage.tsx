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
  const toggleAdvantages = useToggleStore((state) => state.toggleAdvantages);
  const toggleDisadvantages = useToggleStore((state) => state.toggleDisadvantages);

  //Below function is called when user clicks on columns in DisplaySelected component.
  //It ensures both states are synced.
  useEffect(() => {
    toggleKey === 'advantages' ? setKey('advantages') : setKey('disadvantages');
  }, [toggleKey]);

  useEffect(() => {
    if (key === 'advantages') {
      setIsChoosingAdvantages(true);
      toggleAdvantages();
    } else {
      setIsChoosingAdvantages(false);
      toggleDisadvantages();
    }
  }, [key]);

  return (
    <div className="toggle-container">
      <Tabs
        defaultActiveKey="advantages"
        activeKey={key}
        className="toggle-advantages-disadvantages"
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        onSelect={(key) => setKey(key!)}>
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
