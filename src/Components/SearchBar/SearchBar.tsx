import { useAppDispatch, useAppSelector } from 'Components/CustomHooks/reduxHooks';
import { addSelectedOption } from 'features/selectedOptionsSlice';
import React from 'react';
import { useEffect } from 'react';
import Select from 'react-select';
import { SelectOptionObj } from '../../../types';
import AdvantagesArray from '../../Attribute Objects/Advantages';
import DisadvantagesArray from '../../Attribute Objects/Disadvantages';
import { useCharacterStore } from '../../Global State/store';
import ToggleAdvantageDisadvantage from '../ToggleAdvantageDisadvantage/ToggleAdvantageDisadvantage';

import './SearchBar.styles.scss';
import { SearchBarTitle } from './SearchBarTitle';

interface Props {
  combinedAttributesList?: string[];
}

const SearchBar = ({ combinedAttributesList }: Props) => {
  const dispatch = useAppDispatch();

  const isChoosingAdvantages = useAppSelector((state) => state.toggle.isChoosingAdvantages);
  const selectedOptions = useAppSelector((state) => state.options.selectedOptions);

  const setAdavantagesAction = useCharacterStore((state) => state.addAdvantages);
  const setDisadvantagesAction = useCharacterStore((state) => state.addDisadvantages);

  const advantageOptions: SelectOptionObj[] = AdvantagesArray.map((opt) => ({
    label: opt.title,
    value: opt.title,
    category: opt.type
  }));
  const disadvantageOptions: SelectOptionObj[] = DisadvantagesArray.map((opt) => ({
    label: opt.title,
    value: opt.title,
    category: opt.type
  }));

  const handleChange = async (e: SelectOptionObj[]) => {
    dispatch(addSelectedOption(e));
  };

  const updateAttributeStore = (categoryName: string) => {
    const filter = selectedOptions.filter((att) => att.category === categoryName);
    const result = filter.map((obj) => obj.value);
    return result;
  };

  useEffect(() => {
    if (selectedOptions.length > 0) {
      setAdavantagesAction(updateAttributeStore('advantage'));
      setDisadvantagesAction(updateAttributeStore('disadvantage'));
    }
  }, [selectedOptions]);

  const repopulateSelect = () => {
    const adsFilter = advantageOptions.filter((obj) => combinedAttributesList?.includes(obj.label));
    const disadsFilter = disadvantageOptions.filter((obj) =>
      combinedAttributesList?.includes(obj.label)
    );
    dispatch(addSelectedOption([...adsFilter, ...disadsFilter]));
  };

  useEffect(() => {
    repopulateSelect();
  }, [combinedAttributesList]);

  const formatOptionLabel = ({ label, category }) => (
    <div style={category === 'advantage' ? { color: 'seagreen' } : { color: 'brown' }}>{label}</div>
  );

  return (
    <div className="searchbar-container">
      <SearchBarTitle isChoosingAdvantages={isChoosingAdvantages} />
      <div className="toggle-and-search">
        <ToggleAdvantageDisadvantage isChoosingAdvantages={isChoosingAdvantages} />
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
