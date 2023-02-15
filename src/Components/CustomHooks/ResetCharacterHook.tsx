import { useAppDispatch } from 'Components/CustomHooks/reduxHooks';
import { resetSelectedOptions } from 'features/selectedOptionsSlice';
import { resetCharacter } from 'features/characterSlice';

export const useResetCharacter = () => {
  const dispatch = useAppDispatch();

  dispatch(resetSelectedOptions());
  dispatch(resetCharacter());
};
