import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'features/reduxHooks';
import ToggleAdvantageDisadvantage from 'Components/ToggleAdvantageDisadvantage/ToggleAdvantageDisadvantage';
import { storeAdvantageList, storeDisadvantageList } from 'features/characterSlice';
import { addSelectedOption } from 'features/selectedOptionsSlice';
import Select from 'react-select';
import { SelectOptionObj } from '../../../types';
import AdvantagesArray from '../../Attribute Objects/Advantages';
import DisadvantagesArray from '../../Attribute Objects/Disadvantages';

import './Searchbar.styles.scss';
import { SearchbarTitle } from './SearchbarTitle';

interface Props {
  combinedAttributesList?: string[];
}

const Searchbar = ({ combinedAttributesList }: Props) => {
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

    const selectedAdvantages = e
      .filter((adv) => adv.category === 'advantage')
      .map((adv) => adv.label);
    dispatch(storeAdvantageList(selectedAdvantages));

    const selectedDisadvantages = e
      .filter((dis) => dis.category === 'disadvantage')
      .map((dis) => dis.label);
    dispatch(storeDisadvantageList(selectedDisadvantages));
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
      data-testid="items-container"
      title={label}>
      {label}
    </div>
  );

  return (
    <div className="searchbar-container">
      <SearchbarTitle isChoosingAdvantages={isChoosingAdvantages} />
      <div className="toggle-and-search">
        <ToggleAdvantageDisadvantage isChoosingAdvantages={isChoosingAdvantages} />
        <Select
          className="searchbar"
          name="attributes"
          options={isChoosingAdvantages ? advantageOptions : disadvantageOptions}
          value={selectedOptions}
          isMulti
          onChange={handleChange}
          formatOptionLabel={formatOptionLabel}
          //remove
        />
      </div>
    </div>
  );
};

export default Searchbar;
