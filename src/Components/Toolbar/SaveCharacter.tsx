import React, { useContext, useState } from 'react';
import { DocumentData, DocumentReference } from '@firebase/firestore';

import Button from 'react-bootstrap/Button';

import { UserContext } from '../../context';
import {
  addNewCharacterForUser,
  createCharacterDocument,
  getUsersSavedCharactersList
} from '../Firebase/firebase.utils';
import { NewCharacterStatsObj } from '../../../types';
import { setId } from 'features/characterSlice';
import { useAppDispatch, useAppSelector } from 'Components/CustomHooks/reduxHooks';

interface Props {
  setShowSaveAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const SaveCharacter = ({ setShowSaveAlert }: Props) => {
  const dispatch = useAppDispatch();
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const userId = user ? user.uid : '';
  const characterName = useAppSelector((state) => state.character.name);
  const selectedAdvantages = useAppSelector((state) => state.character.advantages);
  const selectedDisadvantages = useAppSelector((state) => state.character.disadvantages);

  const [isSaving, setIsSaving] = useState(false);

  const checkSaveRequirements = async () => {
    const checkIfDuplicate = async () => {
      if (user) {
        const characterList = await getUsersSavedCharactersList(userId);
        return characterList.includes(characterName);
      } else {
        return;
      }
    };

    if (selectedAdvantages.length <= 0 && selectedDisadvantages.length <= 0) {
      alert('You must select at least one Advantage or Disadvantage');
      return;
    } else if (await checkIfDuplicate()) {
      alert(
        'You already have a character with this name. Delete original character or change name'
      );
      return;
    } else if (characterName === '') {
      alert('You must type a name for your character and press enter in order to save');
      return;
    } else {
      return true;
    }
  };

  const saveCharacterHandler = async () => {
    if (await checkSaveRequirements()) {
      setIsSaving(true);
      const newCharacter: NewCharacterStatsObj = {
        name: characterName,
        advantages: selectedAdvantages.map((name: string) => name),
        disadvantages: selectedDisadvantages.map((name: string) => name)
      };

      console.log('**** New Character for ' + userId + ' is ', newCharacter);
      const newCharacterRef: DocumentReference<DocumentData> = await addNewCharacterForUser(
        userId,
        newCharacter
      );

      const characterId = newCharacterRef.id;
      dispatch(setId(characterId));
      await createCharacterDocument(newCharacterRef, characterId);
      try {
        console.log(`**** ${characterName} has been saved`);
        setIsSaving(false);
        setShowSaveAlert(true);
      } catch (error) {
        //Add alert for unsuccessful save??
        console.log('**** Something Went wrong: ', error);
        setIsSaving(false);
      }
    }
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
