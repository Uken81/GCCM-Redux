import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/DropdownItem';
import {
  getMatchingCharacterForUser,
  getUsersSavedCharactersList
} from '../../Firebase/firebase.utils';
import { useEffect, useState } from 'react';

import { useContext } from 'react';
import { UserContext, UserContextInterface } from '../../../context';
import { useCharacterStore } from '../../../Global State/store';
import { useNavigate } from 'react-router';
import { CharacterObj } from '../../../../types';

const LoadCharacter = () => {
  const { user } = useContext(UserContext) as UserContextInterface;

  const [charactersList, setCharactersList] = useState<string[]>([]);
  const [characterToLoad, setCharacterToLoad] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const setName = useCharacterStore((state) => state.addName);
  const setAdvantages = useCharacterStore((state) => state.addAdvantages);
  const setDisadvantages = useCharacterStore((state) => state.addDisadvantages);
  const setId = useCharacterStore((state) => state.addId);

  useEffect(() => {
    const createCharactersList = async () => {
      if (user) {
        const savedCharacters = await getUsersSavedCharactersList(user.uid);
        setCharactersList(savedCharacters);
      }
    };
    createCharactersList();
  }, [user]);

  const handleClick = (characterName: string) => {
    setCharacterToLoad(characterName);
  };

  const getCharacterRecord = async () => {
    const selectedCharacter = characterToLoad;
    const characterRecord = await getMatchingCharacterForUser(user?.uid!, selectedCharacter);
    return characterRecord;
  };

  const repopulateCharacterAttributes = async () => {
    const characterRecord = await getCharacterRecord();
    console.log('CharacterRecord', characterRecord);

    const characterObj: CharacterObj = {
      name: characterRecord?.name,
      advantages: characterRecord?.advantages,
      disadvantages: characterRecord?.disadvantages,
      id: characterRecord?.id
    };
    console.log('characterObj', characterObj);

    setName(characterObj?.name!);
    setAdvantages(characterObj.advantages);
    setDisadvantages(characterObj.disadvantages);
    setId(characterObj.id!);

    console.log(`****${characterObj.name} successfully loaded`);
  };

  const navigate = useNavigate();
  useEffect(() => {
    const loadSelectedCharactersStats = async () => {
      if (characterToLoad !== '') {
        setIsLoading(true);
        await getCharacterRecord();
        await repopulateCharacterAttributes();

        navigate('/manage-characters-page');

        return () => setIsLoading(false);
      }
    };
    loadSelectedCharactersStats();
  }, [characterToLoad]);

  return (
    <div>
      <DropdownButton
        className="dropdown-button"
        title={isLoading ? 'LOADING...' : 'LOAD CHARACTER'}
        variant="outline-primary"
        size="lg">
        {charactersList.length > 0 &&
          charactersList.map((characterName) => (
            <DropdownItem
              className="dropdown-link"
              key={charactersList.indexOf(characterName)}
              onClick={() => handleClick(characterName)}
              style={{
                color: 'white',
                backgroundColor: 'black',
                fontSize: '1.5rem',
                borderBottom: '1px solid white'
              }}>
              {characterName}
            </DropdownItem>
          ))}
      </DropdownButton>
    </div>
  );
};

export default LoadCharacter;
