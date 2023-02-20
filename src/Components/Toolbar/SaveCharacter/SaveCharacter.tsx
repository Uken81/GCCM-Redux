import React, { useContext, useState } from 'react';
import { DocumentData, DocumentReference } from '@firebase/firestore';

import Button from 'react-bootstrap/Button';

import { UserContext } from '../../../context';
import {
  addNewCharacterForUser,
  createCharacterDocument,
  getUsersSavedCharactersList
} from '../../Firebase/firebase.utils';
import { NewCharacterStatsObj } from '../../../../types';
import { setId } from 'features/characterSlice';
import { useAppDispatch, useAppSelector } from 'features/reduxHooks';

interface Props {
  setShowAlert: React.Dispatch<React.SetStateAction<string | null>>;
}

const SaveCharacter = ({ setShowAlert }: Props) => {
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

    if (await checkIfDuplicate()) {
      setShowAlert('duplicate');
      return;
    } else if (characterName === '') {
      setShowAlert('no-name');
      return;
    } else if (selectedAdvantages.length <= 0 && selectedDisadvantages.length <= 0) {
      setShowAlert('no-attributes');
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
      console.log('****CCD ran');
      try {
        console.log(`**** ${characterName} has been saved`);
        setIsSaving(false);
        setShowAlert('success');
      } catch (error) {
        setShowAlert('save-error');
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
