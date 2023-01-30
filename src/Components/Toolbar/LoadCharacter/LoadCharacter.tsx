import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/DropdownItem';
import {
  getMatchingCharacterForUser,
  getUsersSavedCharactersList
} from '../../Firebase/firebase.utils';
import { useEffect, useState } from 'react';

import { useContext } from 'react';
import { UserContext } from '../../../context';
import { useNavigate } from 'react-router';
import { addAdvantage, addDisadvantage, setId, setName } from 'features/characterSlice';
import { useAppDispatch } from 'Components/CustomHooks/reduxHooks';

const LoadCharacter = () => {
  const dispatch = useAppDispatch();
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const [charactersList, setCharactersList] = useState<string[] | null>([]);
  const [characterToLoad, setCharacterToLoad] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const createCharactersList = async () => {
      if (user) {
        const savedCharacters = await getUsersSavedCharactersList(user.uid);
        return setCharactersList(savedCharacters);
      }
    };
    createCharactersList();
  }, [user]);

  const handleClick = (characterName: string) => {
    setCharacterToLoad(characterName);
  };

  const getCharacterRecord = async () => {
    const selectedCharacter = characterToLoad;
    if (user) {
      const characterRecord = await getMatchingCharacterForUser(user.uid, selectedCharacter);
      return characterRecord;
    } else {
      return null;
    }
  };

  const repopulateCharacterAttributes = async () => {
    const characterRecord = await getCharacterRecord();
    dispatch(setName(characterRecord?.name));
    dispatch(addAdvantage(characterRecord?.advantages));
    dispatch(addDisadvantage(characterRecord?.disadvantages));
    dispatch(setId(characterRecord?.id));

    console.log(`****${characterRecord?.name} successfully loaded`);
    console.log(characterRecord);
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
      return;
    };
    loadSelectedCharactersStats();
  }, [characterToLoad]);

  //Consider making a ternary below for cases of null returned from characters list, remove onclick also.
  return (
    <div>
      {charactersList && (
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
      )}
    </div>
  );
};

export default LoadCharacter;
