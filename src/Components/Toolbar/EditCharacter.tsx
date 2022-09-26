import React from 'react';
import { useContext } from 'react';

import Button from 'react-bootstrap/Button';

import { UserContext } from '../../context';
import { GetCharacterReference, SaveChangesToCharacter } from '../Firebase/firebase.utils';
import { useCharacterStore } from '../../Global State/store';
import { useNavigate } from 'react-router';

const EditCharacter = () => {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const userId = user ? user.uid : '';
  const characterId = useCharacterStore((state) => state.character.id);
  const selectedAdvantages = useCharacterStore((state) => state.character.advantages);
  const selectedDisadvantages = useCharacterStore((state) => state.character.disadvantages);

  const navigate = useNavigate();
  const handleEdit = async () => {
    const characterRef = await GetCharacterReference(userId, characterId);
    if (selectedAdvantages.length > 0 || selectedDisadvantages.length > 0) {
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
