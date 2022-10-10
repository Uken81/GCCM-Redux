import React from 'react';
import { useAppSelector } from 'Components/CustomHooks/reduxHooks';

interface Props {
  isChoosingAdvantages: boolean;
}

export const SearchBarTitle = ({ isChoosingAdvantages }: Props) => {
  const characterName = useAppSelector((state) => state.character.name);
  const attributeType = isChoosingAdvantages ? 'ADVANTAGES' : 'DISADVANTAGES';

  const createHeading = () => {
    if (characterName) {
      return (
        <h1>
          SELECT {characterName.toUpperCase()}&apos;S {attributeType}
        </h1>
      );
    } else {
      return <h1>Select your Characters {attributeType}</h1>;
    }
  };

  return <div>{createHeading()}</div>;
};
