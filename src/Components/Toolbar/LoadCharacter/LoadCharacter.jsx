import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/DropdownItem';
import {
  getMatchingCharacterForUser,
  getUsersSavedCharactersList
} from '../../Firebase/firebase.utils';
import { useEffect, useState } from 'react';

import AdvantagesArray from '../../../Attribute Objects/Advantages/Advantages';
import DisadvantagesArray from '../../../Attribute Objects/Disadvantages/Disadvantages';
import { useContext } from 'react';
import { UserContext } from '../../../context';
import { useCharacterStore } from '../../../Global State/store';
import { useNavigate } from 'react-router';

const LoadCharacter = () => {
  const { user } = useContext(UserContext);

  const [dropdownList, setDropdownList] = useState([]);
  const [characterToLoad, setCharacterToLoad] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const setName = useCharacterStore((state) => state.addName);
  const setAdvantages = useCharacterStore((state) => state.addAdvantages);
  const setDisadvantages = useCharacterStore((state) => state.addDisadvantages);
  const setId = useCharacterStore((state) => state.addId);

  useEffect(() => {
    const mapUsersSavedCharactersList = async () => {
      if (user) {
        let tempArr = [];
        const record = await getUsersSavedCharactersList(user.uid);
        record.forEach((element) => {
          tempArr.push(element);
        });
        setDropdownList(tempArr);
      }
    };
    mapUsersSavedCharactersList();
  }, [user]);

  const handleClick = (character) => {
    setCharacterToLoad(character);
  };

  let records;
  const getRecord = async (character) => {
    character = characterToLoad;
    if (characterToLoad !== '') {
      records = await getMatchingCharacterForUser(user.uid, character);
    }
    return records;
  };

  const repopulateCharacterAttributes = async () => {
    const newRecord = await getRecord();

    const characterNameRecord = newRecord.flatMap((item) => item.name);
    const name = characterNameRecord[0];
    console.log('****Loading ', name);

    const advantagesRecord = newRecord.flatMap((item) => item.advantages);
    const characterAdvantages = AdvantagesArray.filter((advantage) =>
      advantagesRecord.includes(advantage.title)
    );

    const disadvantagesRecord = newRecord.flatMap((item) => item.disadvantages);
    const characterDisadvantages = DisadvantagesArray.filter((disadvantage) =>
      disadvantagesRecord.includes(disadvantage.title)
    );

    setName(name);
    setAdvantages(characterAdvantages);
    setDisadvantages(characterDisadvantages);

    console.log(`****${name} successfully loaded`);
    console.log('CD: ', characterDisadvantages);
  };

  const repopulateCurrentCharacterId = async () => {
    const newRecord = await getRecord();
    let characterId = '';
    await newRecord.forEach((element) => {
      characterId = element.id;
    });
    console.log('characterId: ', characterId);

    await setId(characterId);
  };

  const navigate = useNavigate();
  useEffect(() => {
    const loadSelectedCharactersStats = async () => {
      if (characterToLoad !== '') {
        setIsLoading(true);
        await getRecord(characterToLoad);
        await repopulateCharacterAttributes();
        await repopulateCurrentCharacterId();

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
        {dropdownList !== [] &&
          dropdownList.map((character) => (
            <DropdownItem
              className="dropdown-link"
              key={dropdownList.indexOf(character)}
              onClick={() => handleClick(character)}
              style={{
                color: 'white',
                backgroundColor: 'black',
                fontSize: '1.5rem',
                borderBottom: '1px solid white'
              }}>
              {character}
            </DropdownItem>
          ))}
      </DropdownButton>
    </div>
  );
};

export default LoadCharacter;
