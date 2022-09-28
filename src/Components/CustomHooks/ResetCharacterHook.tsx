import { useCharacterStore } from 'Global State/store';

export const useResetCharacter = () => {
  const resetSelect = useCharacterStore((state) => state.resetSelectedOptions);
  const resetCharacter = useCharacterStore((state) => state.resetCharacter);

  resetSelect();
  resetCharacter();
};
