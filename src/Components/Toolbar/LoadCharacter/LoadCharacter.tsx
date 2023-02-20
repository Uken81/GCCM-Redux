import React, { useEffect, useState, useContext } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/DropdownItem';
import {
  getMatchingCharacterForUser,
  getUsersSavedCharactersList
} from '../../Firebase/firebase.utils';

import { UserContext } from '../../../context';
import { useNavigate } from 'react-router';
import {
  storeAdvantageList,
  storeDisadvantageList,
  setId,
  setName
} from '../../../features/characterSlice';
import { useAppDispatch } from '../../../features/reduxHooks';

const LoadCharacter = () => {
  const dispatch = useAppDispatch();
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const [charactersList, setCharactersList] = useState<string[] | null>([]);
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

  const handleClick = async (characterName: string) => {
    setIsLoading(true);
    // await getCharacterRecord(characterName);
    await repopulateCharacterAttributes(characterName);

    navigate('/manage-characters-page');
  };

  const getCharacterRecord = async (characterName) => {
    const selectedCharacter = characterName;
    // const selectedCharacter = characterToLoad;
    if (user) {
      const characterRecord = await getMatchingCharacterForUser(user.uid, selectedCharacter);
      return characterRecord;
    } else {
      return null;
    }
  };

  const repopulateCharacterAttributes = async (characterName) => {
    const characterRecord = await getCharacterRecord(characterName);
    dispatch(setName(characterRecord?.name));
    dispatch(storeAdvantageList(characterRecord?.advantages));
    dispatch(storeDisadvantageList(characterRecord?.disadvantages));
    dispatch(setId(characterRecord?.id));

    console.log(`****${characterRecord?.name} successfully loaded`);
  };

  const navigate = useNavigate();
  // useEffect(() => {
  //   const loadSelectedCharactersStats = async () => {
  //     if (characterToLoad !== '') {
  //       setIsLoading(true);
  //       await getCharacterRecord();
  //       await repopulateCharacterAttributes();

  //       navigate('/manage-characters-page');

  //       return () => setIsLoading(false);
  //     }
  //     return;
  //   };
  //   loadSelectedCharactersStats();
  // }, [characterToLoad]);

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
                // onClick={handleClick}
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
