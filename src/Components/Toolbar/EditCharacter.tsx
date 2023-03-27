import React, { useContext } from 'react';

import Button from 'react-bootstrap/Button';

import { UserContext } from '../../context';
import { GetCharacterReference, SaveChangesToCharacter } from '../Firebase/firebase.utils';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from 'features/reduxHooks';
import { resetCharacter } from 'features/characterSlice';

const EditCharacter = () => {
  const dispatch = useAppDispatch();
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const userId = user ? user.uid : '';
  const characterId = useAppSelector((state) => state.character.id);
  const selectedAdvantages = useAppSelector((state) => state.character.advantages);
  const selectedDisadvantages = useAppSelector((state) => state.character.disadvantages);
  const name = useAppSelector((state) => state.character.name);

  const navigate = useNavigate();
  const handleEdit = async () => {
    const characterRef = await GetCharacterReference(userId, characterId);
    if (selectedAdvantages.length > 0 || selectedDisadvantages.length > 0) {
      await SaveChangesToCharacter(characterRef, selectedAdvantages, selectedDisadvantages, name);
      dispatch(resetCharacter());
      console.log(`${characterRef} has been successfully edited.`);
      navigate('/create-or-manage-page');
    } else {
      console.log('**** Edit fail');
    }
  };

  return (
    <Button size="lg" variant="outline-primary" onClick={handleEdit}>
      Save Changes
    </Button>
  );
};

export default EditCharacter;
