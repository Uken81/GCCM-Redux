// import SelectedAdvantages from 'Components/Selected/Selected Atributes/SelectedAdvantages';
import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useCharacterStore } from '../../Global State/store';

interface Props {
  setCombinedAttributesList: React.Dispatch<React.SetStateAction<string[]>>;
}

const ResetChanges = ({ setCombinedAttributesList }: Props) => {
  const selectedAdvantages = useCharacterStore((state) => state.character.advantages);
  const selectedDisadvantages = useCharacterStore((state) => state.character.disadvantages);

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
