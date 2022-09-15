import React from 'react';
import { useContext } from 'react';

import Button from 'react-bootstrap/Button';

import { UserContext, UserContextInterface } from '../../../context';
import { GetCharacterReference, SaveChangesToCharacter } from '../../Firebase/firebase.utils';
import { useCharacterStore } from '../../../Global State/store';
import { useNavigate } from 'react-router';

const EditCharacter = () => {
  const { user } = useContext(UserContext) as UserContextInterface;

  const currentCharacterId = useCharacterStore((state) => state.character.currentCharacterId);
  const selectedAdvantages = useCharacterStore((state) => state.character.selectedAdvantages);
  const selectedDisadvantages = useCharacterStore((state) => state.character.selectedDisadvantages);

  const navigate = useNavigate();
  const handleEdit = async () => {
    const characterRef = await GetCharacterReference(user?.uid, currentCharacterId);
    //below line could be made a function or maybe a custom hook
    if (selectedAdvantages.length !== 0 || selectedDisadvantages.length !== 0) {
      await SaveChangesToCharacter(characterRef, selectedAdvantages, selectedDisadvantages);
      console.log(`${characterRef} has been successfully edited.`);
      navigate('/create-or-manage-page');
    } else {
      console.log('**** Edit fail');
      alert('You must select at least one Advantage or Disadvantage');
    }
  };

  return (
    <div className="button-container">
      <Button className="tool-button" onClick={handleEdit}>
        Save Changes
      </Button>
    </div>
  );
};

export default EditCharacter;
