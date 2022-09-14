import React from 'react';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { SelectOptionObj } from '../../../types';
import AdvantagesArray from '../../Attribute Objects/Advantages/Advantages';
import DisadvantagesArray from '../../Attribute Objects/Disadvantages/Disadvantages';
import { useCharacterStore } from '../../Global State/store';
import ToggleAdvantageDisadvantage from '../ToggleAdvantageDisadvantage/ToggleAdvantageDisadvantage';

import './SearchBar.styles.scss';

const SearchBar = () => {
  const [advantageOptions, setAdvantageOptions] = useState<SelectOptionObj[]>([]);
  const [disadvantageOptions, setDisadvantageOptions] = useState<SelectOptionObj[]>([]);
  const [selectInput, setSelectInput] = useState<SelectOptionObj[]>([]);
  const [isChoosingAdvantages, setIsChoosingAdvantages] = useState<boolean>(true);

  const characterName = useCharacterStore((state) => state.character.name);
  const selectedAdvantages = useCharacterStore((state) => state.character.selectedAdvantages);
  const selectedDisadvantages = useCharacterStore((state) => state.character.selectedDisadvantages);
  //Is it ok to use set when naming an action or should I reserve that for useState?
  const setSelectedAdavantages = useCharacterStore((state) => state.addAdvantages);
  const setSelectedDisadvantages = useCharacterStore((state) => state.addDisadvantages);

  useEffect(() => {
    const createSearchOptions = () => {
      //remove any types below.
      const allAdvatageObjs: any = AdvantagesArray.map((opt) => ({
        label: opt.title,
        value: opt,
        category: opt.type
      }));
      const allDisadvantageObjs: any = DisadvantagesArray.map((opt) => ({
        label: opt.title,
        value: opt,
        category: opt.type
      }));
      setAdvantageOptions(allAdvatageObjs);
      setDisadvantageOptions(allDisadvantageObjs);
    };
    createSearchOptions();
  }, []);

  const updateSelectedList = (e: SelectOptionObj[]) => {
    setSelectInput(e);
  };

  const updateCharacterStore = (e: SelectOptionObj[]) => {
    e.map((attribute) => {
      console.log('att', attribute.value);
      const selectedAttribute = attribute.value;
      attribute.category === 'advantage'
        ? setSelectedAdavantages([...selectedAdvantages, selectedAttribute])
        : setSelectedDisadvantages([...selectedDisadvantages, selectedAttribute]);
    });
  };

  const handleChange = (e: SelectOptionObj[]) => {
    updateSelectedList(e);
    updateCharacterStore(e);
  };

  const formatOptionLabel = ({ label, category }) => (
    <div style={category === 'advantage' ? { color: 'seagreen' } : { color: 'brown' }}>{label}</div>
  );

  const attributeType = () => {
    //isChoosingAdvantages ? 'ADVANTAGES' : 'DISADVANTAGES'
    //try to find cleaner way to write this. telmo??
    if (isChoosingAdvantages) {
      return 'ADVANTAGES';
    } else {
      return 'Disadvantages';
    }
  };

  return (
    <div className="searchbar-container">
      {characterName === '' ? (
        <h1>Select your Characters {attributeType()}</h1>
      ) : (
        <h1>
          SELECT {characterName.toUpperCase()}&apos;S {attributeType()}
        </h1>
      )}
      <div className="toggle-and-search">
        <ToggleAdvantageDisadvantage setIsChoosingAdvantages={setIsChoosingAdvantages} />
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
