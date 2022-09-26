import React from 'react';
import { setDoc } from '@firebase/firestore';
import { useContext, useState } from 'react';

import Button from 'react-bootstrap/Button';

import { UserContext } from '../../context';
import { useCharacterStore, useToggleStore } from '../../Global State/store';
import { addNewCharacterForUser, getUsersSavedCharactersList } from '../Firebase/firebase.utils';
import { NewCharacterStatsObj } from '../../../types';

const SaveCharacter = () => {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const userId = user ? user.uid : '';
  const characterName = useCharacterStore((state) => state.character.name);
  const selectedAdvantages = useCharacterStore((state) => state.character.advantages);
  const selectedDisadvantages = useCharacterStore((state) => state.character.disadvantages);
  const setCharacterIdAction = useCharacterStore((state) => state.addId);

  const toggleShow = useToggleStore((state) => state.toggleShow);

  const [isSaving, setIsSaving] = useState(false);

  const checkIfDuplicate = async () => {
    if (user) {
      const characterList = await getUsersSavedCharactersList(userId);
      return characterList.includes(characterName);
    } else {
      return;
    }
  };

  const saveCharacterHandler = async () => {
    setIsSaving(true);
    if (selectedAdvantages.length <= 0 && selectedDisadvantages.length <= 0) {
      console.log('**** Save fail');
      alert('You must select at least one Advantage or Disadvantage');
    } else if (await checkIfDuplicate()) {
      console.log('**** Save fail');
      alert(
        'You already have a character with this name. Delete original character or change name'
      );
    } else if (characterName === '') {
      console.log('**** Save fail');
      alert('You must select a name for your character in order to save');
    } else {
      console.log(`**** ${characterName} has been saved`);

      const newCharacter: NewCharacterStatsObj = {
        name: characterName,
        advantages: selectedAdvantages.map((name) => name),
        disadvantages: selectedDisadvantages.map((name) => name)
      };

      console.log('**** New Character for ' + userId + ' is ', newCharacter);
      const newCharacterRef = await addNewCharacterForUser(userId, newCharacter);
      console.log('**** NewCharacterRef: ', newCharacterRef);

      const characterId = newCharacterRef.id;
      setCharacterIdAction(characterId);
      console.log('**** NewCharacterId: ', characterId);
      await setDoc(newCharacterRef, { id: characterId }, { merge: true });

      toggleShow();
    }
    setIsSaving(false);
  };

  return (
    <div className="button-container">
      <Button className="tool-button" size="lg" onClick={saveCharacterHandler}>
        {isSaving ? 'Saving...' : 'Save Character'}
      </Button>
    </div>
  );
};

export default SaveCharacter;
