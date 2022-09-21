import { useCharacterStore } from '../../Global State/store';

const useResetCharacter = () => {
  console.log('reset');
  const reset = useCharacterStore((state) => state.resetCharacter);
  reset();
};

export default useResetCharacter;
