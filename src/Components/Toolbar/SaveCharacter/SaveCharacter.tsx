import React, { useContext, useState } from 'react';
import { DocumentData, DocumentReference } from '@firebase/firestore';

import Button from 'react-bootstrap/Button';

import { UserContext } from '../../../context';
import {
  addNewCharacter,
  createCharacterDocument,
  getUsersSavedCharacterList
} from '../../Firebase/firebase.utils';
import { NewCharacterStatsObj } from '../../../../types';
import { setId } from 'features/characterSlice';
import { useAppDispatch, useAppSelector } from 'features/reduxHooks';

interface Props {
  setAlertType: React.Dispatch<React.SetStateAction<string>>;
}

const SaveCharacter = ({ setAlertType }: Props) => {
  const dispatch = useAppDispatch();
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const userId = user ? user.uid : '';
  const characterName = useAppSelector((state) => state.character.name);
  const selectedAdvantages = useAppSelector((state) => state.character.advantages);
  const selectedDisadvantages = useAppSelector((state) => state.character.disadvantages);
  const [isSaving, setIsSaving] = useState(false);

  const checkSaveRequirements = async () => {
    const checkIfDuplicate = async (userId: string, characterName: string) => {
      const characterList = await getUsersSavedCharacterList(userId);
      const nameInDatabase = characterList.includes(characterName);
      return nameInDatabase;
    };

    const isDuplicate = await checkIfDuplicate(userId, characterName);
    const alertName = async () => {
      if (isDuplicate) {
        return 'duplicate';
      } else if (characterName === '') {
        return 'nameError';
      } else if (selectedAdvantages.length <= 0 && selectedDisadvantages.length <= 0) {
        return 'attributesError';
      } else {
        return 'success';
      }
    };

    const alert = await alertName();
    setAlertType(alert);
    const requirementsPass = alert === 'success' ? true : false;

    return requirementsPass;
  };

  const saveCharacterHandler = async () => {
    const saveStatus = await checkSaveRequirements();

    if (saveStatus) {
      console.log('****saving');
      setIsSaving(true);
      const newCharacter: NewCharacterStatsObj = {
        name: characterName,
        advantages: selectedAdvantages.map((name: string) => name),
        disadvantages: selectedDisadvantages.map((name: string) => name)
      };

      console.log('**** New Character for ' + userId + ' is ', newCharacter);
      const newCharacterRef: DocumentReference<DocumentData> = await addNewCharacter(
        userId,
        newCharacter
      );

      const characterId = newCharacterRef.id;
      dispatch(setId(characterId));

      try {
        await createCharacterDocument(newCharacterRef, characterId);
        console.log(`**** ${characterName} has been saved`);
        setIsSaving(false);
      } catch (error) {
        console.log('**** Saving Error: ', error);
        setAlertType('saveError');
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
