import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { AttributeObj } from '../../types';

let ToggleStore = (set) => ({
  showSuccessAlert: false,
  toggleShow: () => set({ showSuccessfulSaveAlert: true }),
  toggleHide: () => set({ showSuccessfulSaveAlert: false })
});

interface CharacterStoreType {
  character: {
    name: string | null;
    selectedAdvantages: AttributeObj[];
    selectedDisadvantages: AttributeObj[];
    currentCharacterId: string;
  };
  resetCharacter: () => void;
  addAdvantages: (advantagesList: AttributeObj[]) => void;
  addDisadvantages: (disadvantageList: any) => void;
}

const initialCharacterState = {
  character: {
    name: null,
    selectedAdvantages: [],
    selectedDisadvantages: [],
    currentCharacterId: ''
  }
};

export const useCharacterStore = create<CharacterStoreType>(
  devtools((set) => ({
    ...initialCharacterState,
    resetCharacter: () => {
      set(initialCharacterState);
    },
    addAdvantages: (advantagesList) =>
      set((state) => ({
        character: (state.character = {
          ...state.character,
          selectedAdvantages: advantagesList
        })
      })),
    addDisadvantages: (disadvantageList) =>
      set((state) => ({
        character: (state.character = {
          ...state.character,
          selectedDisadvantages: disadvantageList
        })
      }))
  }))
);

export const useToggleStore = create(ToggleStore);
