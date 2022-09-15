import { useCharacterStore } from '../../Global State/store';

const useResetCharacterOnLoad = () => {
  useCharacterStore((state) => state.resetCharacter);
};

export default useResetCharacterOnLoad;
