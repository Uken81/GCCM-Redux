import { useCharacterStore } from '../../Global State/store';

const useResetCharacterOnLoad = () => {
  useCharacterStore((state) => state.resetCharacter);
  // const resetCharacter = useCharacterStore((state) => state.resetCharacter);
  // resetCharacter();
};

export default useResetCharacterOnLoad;
