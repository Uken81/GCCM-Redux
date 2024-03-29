import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { UserContext } from '../../../context';
import { addNewCharacter, getUsersSavedCharacterList } from '../../Firebase/firebase.utils';
import { NewCharacterStatsObj } from '../../../../types';
import { useAppSelector } from 'features/reduxHooks';

interface Props {
  setAlertType: (value: string) => void;
}

const SaveCharacter = ({ setAlertType }: Props) => {
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
      const existsInDatabase = characterList.includes(characterName);
      return existsInDatabase;
    };

    const isDuplicate = await checkIfDuplicate(userId, characterName);
    const emptyName = characterName === '';
    const emptyAttributes = selectedAdvantages.length <= 0 && selectedDisadvantages.length <= 0;
    const alertName = async () => {
      if (isDuplicate) {
        return 'duplicate';
      } else if (emptyName) {
        return 'nameError';
      } else if (emptyAttributes) {
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
      setIsSaving(true);
      const newCharacter: NewCharacterStatsObj = {
        name: characterName,
        advantages: selectedAdvantages.map((name: string) => name),
        disadvantages: selectedDisadvantages.map((name: string) => name)
      };

      console.log('**** New Character for ' + userId + ' is ', newCharacter);
      try {
        await addNewCharacter(userId, newCharacter);
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
    <Button size="lg" variant="outline-primary" onClick={saveCharacterHandler}>
      {isSaving ? 'Saving...' : 'Save Character'}
    </Button>
  );
};

export default SaveCharacter;
