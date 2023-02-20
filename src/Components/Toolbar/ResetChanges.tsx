import { storeAdvantageList, storeDisadvantageList } from 'features/characterSlice';
import { useAppDispatch, useAppSelector } from 'features/reduxHooks';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const ResetChanges = () => {
  const dispatch = useAppDispatch();
  const selectedAdvantages = useAppSelector((state) => state.character.advantages);
  const selectedDisadvantages = useAppSelector((state) => state.character.disadvantages);

  const [initialAdvantages] = useState([...selectedAdvantages]);
  const [initialDisadvantages] = useState([...selectedDisadvantages]);

  const handleClick = async () => {
    dispatch(storeAdvantageList(initialAdvantages));
    dispatch(storeDisadvantageList(initialDisadvantages));
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
