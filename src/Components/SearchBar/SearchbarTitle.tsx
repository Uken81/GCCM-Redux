import React from 'react';
import { useAppSelector } from 'features/reduxHooks';

interface Props {
  isChoosingAdvantages: boolean;
}

export const SearchbarTitle = ({ isChoosingAdvantages }: Props) => {
  const characterName = useAppSelector((state) => state.character.name);
  const attributeType = isChoosingAdvantages ? 'ADVANTAGES' : 'DISADVANTAGES';

  const createHeading = () => {
    if (characterName) {
      return (
        <h2>
          SELECT {characterName.toUpperCase()}&apos;S {attributeType}
        </h2>
      );
    } else {
      return <h2>Select your Characters {attributeType}</h2>;
    }
  };

  return <div>{createHeading()}</div>;
};
