import { useCharacterStore } from 'Global State/store';
import { useEffect } from 'react';
import { useAppDispatch } from 'Components/CustomHooks/reduxHooks';
import { resetSelectedOptions } from 'features/selectedOptionsSlice';

export const useResetCharacter = () => {
  const dispatch = useAppDispatch();
  const resetCharacter = useCharacterStore((state) => state.resetCharacter);

  useEffect(() => {
    dispatch(resetSelectedOptions());
    resetCharacter();
  }, []);
};
