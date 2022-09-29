import { useCharacterStore } from 'Global State/store';
import { useEffect } from 'react';

export const useResetCharacter = () => {
  const resetSelect = useCharacterStore((state) => state.resetSelectedOptions);
  const resetCharacter = useCharacterStore((state) => state.resetCharacter);

  useEffect(() => {
    resetSelect();
    resetCharacter();
  }, []);
};
