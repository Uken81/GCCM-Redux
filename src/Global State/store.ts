import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { AttributeObj, SelectOptionObj } from '../../types';

let ToggleStore = (set) => ({
  isChoosingAdvantages: true,
  toggleAdvantages: () => set({ isChoosingAdvantages: true }),
  toggleDisadvantages: () => set({ isChoosingAdvantages: false }),

  showSuccessAlert: false,
  toggleShow: () => set({ showSuccessfulSaveAlert: true }),
  toggleHide: () => set({ showSuccessfulSaveAlert: false })
});

interface CharacterStoreType {
  character: {
    characterName: string;
    selectedAdvantages: AttributeObj[];
    selectedDisadvantages: AttributeObj[];
    currentCharacterId: string;
  };
  resetCharacter: () => void;
  addAdvantages: (advantagesList: SelectOptionObj[]) => void;
  addDisadvantages: (disadvantageLis: SelectOptionObj[]) => void;
}

const initialCharacterState = {
  characterName: '',
  selectedAdvantages: [],
  selectedDisadvantages: [],
  currentCharacterId: ''
};

export const useCharacterStore = create<CharacterStoreType>(
  devtools((set) => ({
    character: {
      characterName: '',
      selectedAdvantages: [],
      selectedDisadvantages: [],
      currentCharacterId: ''
    },
    initialCharacterState,
    resetCharacter: () => {
      set({
        character: {
          characterName: '',
          selectedAdvantages: [],
          selectedDisadvantages: [],
          currentCharacterId: ''
        }
      });
    },
    addAdvantages: (advantagesList) =>
      set((state) => ({
        ...state,
        selectedAdvantages: advantagesList
      })),
    addDisadvantages: (disadvantageList) =>
      set((state) => ({
        ...state,
        selectedDisadvantages: disadvantageList
      }))
  }))
);

export const useToggleStore = create(ToggleStore);
