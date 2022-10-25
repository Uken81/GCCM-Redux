import { useAppDispatch, useAppSelector } from 'Components/CustomHooks/reduxHooks';
import ToggleAdvantageDisadvantage from 'Components/ToggleAdvantageDisadvantage/ToggleAdvantageDisadvantage';
import { addAdvantage, addDisadvantage } from 'features/characterSlice';
import { addSelectedOption } from 'features/selectedOptionsSlice';
import React from 'react';
import { useEffect } from 'react';
import Select from 'react-select';
import { SelectOptionObj } from '../../../types';
import AdvantagesArray from '../../Attribute Objects/Advantages';
import DisadvantagesArray from '../../Attribute Objects/Disadvantages';

import './SearchBar.styles.scss';
import { SearchBarTitle } from './SearchBarTitle';

interface Props {
  combinedAttributesList?: string[];
}

const SearchBar = ({ combinedAttributesList }: Props) => {
  const dispatch = useAppDispatch();

  const isChoosingAdvantages = useAppSelector((state) => state.toggle.isChoosingAdvantages);
  const selectedOptions = useAppSelector((state) => state.options.selectedOptions);

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

    const lastSelected = e.slice(-1)[0];
    lastSelected.category === 'advantage'
      ? dispatch(addAdvantage(lastSelected.value))
      : dispatch(addDisadvantage(lastSelected.value));
  };

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
    <div
      style={category === 'advantage' ? { color: 'seagreen' } : { color: 'brown' }}
      data-testid="items-container">
      {label}
    </div>
  );

  return (
    <div className="searchbar-container">
      <SearchBarTitle isChoosingAdvantages={isChoosingAdvantages} />
      <div className="toggle-and-search">
        <ToggleAdvantageDisadvantage isChoosingAdvantages={isChoosingAdvantages} />
        <Select
          className="searchBar"
          name="attributes"
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
