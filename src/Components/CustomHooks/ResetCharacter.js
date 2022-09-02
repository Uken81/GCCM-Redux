import { useCharacterStore } from '../../Global State/store';

const useResetCharacterOnLoad = () => {
  const resetCharacter = useCharacterStore((state) => state.resetCharacter);
  resetCharacter();
};

export default useResetCharacterOnLoad;
