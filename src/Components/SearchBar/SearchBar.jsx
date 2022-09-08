import { useEffect, useState } from 'react';
import Select from 'react-select';
import AdvantagesArray from '../../Attribute Objects/Advantages/Advantages';
import DisadvantagesArray from '../../Attribute Objects/Disadvantages/Disadvantages';
import { useCharacterStore, useToggleStore } from '../../Global State/store';
import ToggleAdvantageDisadvantage from '../ToggleAdvantageDisadvantage/ToggleAdvantageDisadvantage';

import './SearchBar.styles.scss';

const SearchBar = () => {
  const [advantageOptions, setAdvantageOptions] = useState([]);
  const [disadvantageOptions, setDisadvantageOptions] = useState([]);
  const [selectInput, setSelectInput] = useState([]);

  const characterName = useCharacterStore((state) => state.character.characterName);
  const selectedAdvantages = useCharacterStore((state) => state.character.selectedAdvantages);
  const selectedDisadvantages = useCharacterStore((state) => state.character.selectedDisadvantages);
  const setSelectedAdavantages = useCharacterStore((state) => state.addAdvantages);
  const setSelectedDisadvantages = useCharacterStore((state) => state.addDisadvantages);

  const isChoosingAdvantages = useToggleStore((state) => state.isChoosingAdvantages);

  useEffect(() => {
    const createSearchOptions = () => {
      const allAdvatageObjs = AdvantagesArray.map((opt) => ({
        label: opt.title,
        value: opt,
        category: opt.type
      }));
      const allDisadvantageObjs = DisadvantagesArray.map((opt) => ({
        label: opt.title,
        value: opt,
        category: opt.type
      }));
      setAdvantageOptions(allAdvatageObjs);
      setDisadvantageOptions(allDisadvantageObjs);
    };
    createSearchOptions();
  }, []);

  const updateSearchList = (e) => {
    console.log('e', e);
    setSelectInput(e);
  };

  const updateCharacterStore = (e) => {
    console.log('list', selectInput, e);
    e.map((attribute) => {
      attribute.category === 'advantage'
        ? setSelectedAdavantages([...selectedAdvantages, attribute.value])
        : setSelectedDisadvantages([...selectedDisadvantages, attribute.value]);
    });
  };

  // const updateSelectedList = () => {

  // }

  const handleChange = (e) => {
    updateSearchList(e);
    updateCharacterStore(e);
  };

  // useEffect(() => {
  //   const updateSelect = () => {
  //     let adsArr = selectedAdvantages.map((adv) => ({
  //       label: adv.title,
  //       value: adv,
  //       category: adv.type
  //     }));

  //     let disadsArr = selectedDisadvantages.map((disad) => ({
  //       label: disad.title,
  //       value: disad,
  //       category: disad.type
  //     }));

  //     // eslint-disable-next-line no-unused-vars
  //     let combinedArr = [...adsArr, ...disadsArr];
  //     // setSelectInput(combinedArr);
  //   };
  //   updateSelect();
  //   console.log('Sads', selectedAdvantages);
  // }, [selectedAdvantages, selectedDisadvantages]);

  const formatOptionLabel = ({ label, category }) => (
    <div style={category === 'advantage' ? { color: 'seagreen' } : { color: 'brown' }}>{label}</div>
  );

  return (
    <div className="searchbar-container">
      {characterName === '' ? (
        <h1>Select your Characters {isChoosingAdvantages ? 'ADVANTAGES' : 'DISADVANTAGES'}</h1>
      ) : (
        <h1>
          SELECT {characterName.toUpperCase()}&apos;S{' '}
          {isChoosingAdvantages ? 'ADVANTAGES' : 'DISADVANTAGES'}
        </h1>
      )}
      <div className="toggle-and-search">
        <ToggleAdvantageDisadvantage />
        <Select
          className="searchBar"
          options={isChoosingAdvantages ? advantageOptions : disadvantageOptions}
          value={selectInput}
          isMulti
          onChange={handleChange}
          formatOptionLabel={formatOptionLabel}
        />
      </div>
    </div>
  );
};

export default SearchBar;
