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

  const isChoosingAdvantages = useToggleStore((state) => state.isChoosingAdvantages);

  useEffect(() => {
    const createSearchOptions = () => {
      let adsArr = AdvantagesArray.map((opt) => ({
        label: opt.title,
        value: opt,
        category: opt.type
      }));
      let disadsArr = DisadvantagesArray.map((opt) => ({
        label: opt.title,
        value: opt,
        category: opt.type
      }));
      setAdvantageOptions(adsArr);
      setDisadvantageOptions(disadsArr);
    };
    createSearchOptions();
  }, []);

  const handleChange = (event) => {
    setSelectInput(event.value);
    let adsArr = [];
    let disadsArr = [];
    console.log('selected attributes:', event);
    event.forEach((e) => {
      e.value.type === 'advantage' ? adsArr.push(e.value) : disadsArr.push(e.value);
    });
    // useCharacterStore.setState({ selectedAdvantages: adsArr });
    useCharacterStore.setState({ selectedAdvantages: adsArr });
    useCharacterStore.setState({ selectedAdvantages: adsArr });
    useCharacterStore.setState({ selectedDisadvantages: disadsArr });
  };

  useEffect(() => {
    const updateSelect = () => {
      let adsArr = selectedAdvantages.map((adv) => ({
        label: adv.title,
        value: adv,
        category: adv.type
      }));

      let disadsArr = selectedDisadvantages.map((disad) => ({
        label: disad.title,
        value: disad,
        category: disad.type
      }));

      let combinedArr = [...adsArr, ...disadsArr];
      setSelectInput(combinedArr);
    };
    updateSelect();
  }, [selectedAdvantages, selectedDisadvantages]);

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
