import React from 'react';
import { useAppSelector } from 'features/reduxHooks';

export const SearchbarTitle: React.FC<{ isChoosingAdvantages }> = ({ isChoosingAdvantages }) => {
  const characterName = useAppSelector((state) => state.character.name);
  const attributeType = isChoosingAdvantages ? 'Advantages' : 'Disadvantages';

  const title = characterName ? (
    <h2 className="title">
      Select {characterName}&apos;s {attributeType}
    </h2>
  ) : (
    <h2 className="title">Select your Characters {attributeType}</h2>
  );

  return title;
};
