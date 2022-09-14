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
    currentCharacterId: string | null;
  };
  resetCharacter: () => void;
  addName: (name: string) => void;
  addAdvantages: (advantagesList: AttributeObj[]) => void;
  addDisadvantages: (disadvantageList: AttributeObj[]) => void;
  addId: (id: string) => void;
}

const initialCharacterState = {
  character: {
    name: null,
    selectedAdvantages: [],
    selectedDisadvantages: [],
    currentCharacterId: null
  }
};

export const useCharacterStore = create<CharacterStoreType>(
  devtools((set) => ({
    ...initialCharacterState,
    resetCharacter: () => {
      set(initialCharacterState);
    },
    addName: (name) =>
      set((state) => ({
        character: (state.character = {
          ...state.character,
          name: name
        })
      })),
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
      })),
      addId: (id) => 
      set((state) => ({
        character: (state.character ={
          ...state.character,
          currentCharacterId: id
        })
      }))
  }))
);

export const useToggleStore = create(ToggleStore);
