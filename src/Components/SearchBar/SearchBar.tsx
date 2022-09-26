import React from 'react';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { SelectOptionObj } from '../../../types';
import AdvantagesArray from '../../Attribute Objects/Advantages';
import DisadvantagesArray from '../../Attribute Objects/Disadvantages';
import { useCharacterStore } from '../../Global State/store';
import ToggleAdvantageDisadvantage from '../ToggleAdvantageDisadvantage/ToggleAdvantageDisadvantage';

import './SearchBar.styles.scss';
import { SearchBarTitle } from './SearchBarTitle';

const SearchBar = () => {
  const [isChoosingAdvantages, setIsChoosingAdvantages] = useState<boolean>(true);
  const [advantageOptions, setAdvantageOptions] = useState<SelectOptionObj[]>([]);
  const [disadvantageOptions, setDisadvantageOptions] = useState<SelectOptionObj[]>([]);
  const selectedOptions = useCharacterStore((state) => state.selectedOptions);
  const addSelectedOptionAction = useCharacterStore((state) => state.addSelectedOption);
  const setAdavantagesAction = useCharacterStore((state) => state.addAdvantages);
  const setDisadvantagesAction = useCharacterStore((state) => state.addDisadvantages);

  useEffect(() => {
    const createSearchOptions = () => {
      const advantageOptionsObj: SelectOptionObj[] = AdvantagesArray.map((opt) => ({
        label: opt.title,
        value: opt.title,
        category: opt.type
      }));
      const disadvantageOptionsObj: SelectOptionObj[] = DisadvantagesArray.map((opt) => ({
        label: opt.title,
        value: opt.title,
        category: opt.type
      }));
      setAdvantageOptions(advantageOptionsObj);
      setDisadvantageOptions(disadvantageOptionsObj);
    };
    createSearchOptions();
  }, []);

  const handleChange = async (e: SelectOptionObj[]) => {
    addSelectedOptionAction(e);
  };

  const updateAttributeStore = (categoryName: string) => {
    const filter = selectedOptions.filter((att) => att.category === categoryName);
    const result = filter.map((obj) => obj.value);
    return result;
  };

  useEffect(() => {
    setAdavantagesAction(updateAttributeStore('advantage'));
    setDisadvantagesAction(updateAttributeStore('disadvantage'));
  }, [selectedOptions]);

  const formatOptionLabel = ({ label, category }) => (
    <div style={category === 'advantage' ? { color: 'seagreen' } : { color: 'brown' }}>{label}</div>
  );

  return (
    <div className="searchbar-container">
      <SearchBarTitle isChoosingAdvantages={isChoosingAdvantages} />
      <div className="toggle-and-search">
        <ToggleAdvantageDisadvantage setIsChoosingAdvantages={setIsChoosingAdvantages} />
        <Select
          className="searchBar"
          options={isChoosingAdvantages ? advantageOptions : disadvantageOptions}
          value={selectedOptions}
          isMulti
          onChange={handleChange}
          formatOptionLabel={formatOptionLabel}
        />
      </div>
    </div>
  );
};

export default SearchBar;
