import { useEffect } from 'react';
import { useAppDispatch } from 'Components/CustomHooks/reduxHooks';
import { resetSelectedOptions } from 'features/selectedOptionsSlice';
import { resetCharacter } from 'features/characterSlice';

export const useResetCharacter = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetSelectedOptions());
    dispatch(resetCharacter());
  }, []);
};
