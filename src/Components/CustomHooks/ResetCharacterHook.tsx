import { useCharacterStore } from 'Global State/store';

export const useResetCharacter = () => {
  const resetSelect = useCharacterStore((state) => state.resetSelectedOptions);
  const resetCharacter = useCharacterStore((state) => state.resetCharacter);
  const selectedOptions = useCharacterStore((state) => state.selectedOptions);

  if (selectedOptions.length > 0) {
    resetSelect();
    resetCharacter();
  }
};
