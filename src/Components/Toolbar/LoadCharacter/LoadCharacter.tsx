import React, { useState, useContext } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/DropdownItem';
import {
  getMatchingCharacterForUser,
  getUsersSavedCharacterList
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
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const [characterList, setCharacterList] = useState<string[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);

  const repopulateCharacterList = async () => {
    if (user) {
      const savedCharacters = await getUsersSavedCharacterList(user.uid);
      return setCharacterList(savedCharacters);
    }
  };
  repopulateCharacterList();

  const getCharacterRecord = async (characterName: string) => {
    const selectedCharacter = characterName;
    if (user) {
      const characterRecord = await getMatchingCharacterForUser(user.uid, selectedCharacter);
      return characterRecord;
    } else {
      return null;
    }
  };

  const repopulateCharacterAttributes = async (characterName: string) => {
    const characterRecord = await getCharacterRecord(characterName);
    dispatch(setName(characterRecord?.name));
    dispatch(storeAdvantageList(characterRecord?.advantages));
    dispatch(storeDisadvantageList(characterRecord?.disadvantages));
    dispatch(setId(characterRecord?.id));

    console.log(`****${characterRecord?.name} successfully loaded`);
  };

  const handleClick = async (characterName: string) => {
    setIsLoading(true);
    await repopulateCharacterAttributes(characterName);
    navigate('/manage-characters-page');
  };

  return (
    <div>
      {characterList && (
        <DropdownButton
          className="dropdown-button"
          title={isLoading ? 'LOADING...' : 'LOAD CHARACTER'}
          variant="outline-primary"
          size="lg">
          {characterList.length > 0 &&
            characterList.map((characterName) => (
              <DropdownItem
                className="dropdown-link"
                key={characterList.indexOf(characterName)}
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
