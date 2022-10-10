import { useAppSelector } from 'Components/CustomHooks/reduxHooks';
import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

interface Props {
  setCombinedAttributesList: React.Dispatch<React.SetStateAction<string[]>>;
}

const ResetChanges = ({ setCombinedAttributesList }: Props) => {
  const selectedAdvantages = useAppSelector((state) => state.character.advantages);
  const selectedDisadvantages = useAppSelector((state) => state.character.disadvantages);

  const [initialAdvantages] = useState([...selectedAdvantages]);
  const [initialDisadvantages] = useState([...selectedDisadvantages]);

  const handleClick = async () => {
    setCombinedAttributesList([...initialAdvantages, ...initialDisadvantages]);
  };

  return (
    <div>
      <Button className="tool-button" onClick={handleClick} size="lg">
        Reset Changes
      </Button>
    </div>
  );
};

export default ResetChanges;
