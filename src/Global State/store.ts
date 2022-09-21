import { CharacterObj } from './../../types';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

let ToggleStore = (set) => ({
  toggleKey: 'advantage',
  toggleAdvantages: () => set({ toggleKey: 'advantages' }),
  toggleDisadvantages: () => set({ toggleKey: 'disadvantages' }),

  showSuccessAlert: false,
  toggleShow: () => set({ showSuccessfulSaveAlert: true }),
  toggleHide: () => set({ showSuccessfulSaveAlert: false })
});

interface CharacterStoreType {
  character: CharacterObj;
  resetCharacter: () => void;
  addName: (name: string) => void;
  addAdvantages: (advantagesList: string[]) => void;
  addDisadvantages: (disadvantageList: string[]) => void;
  addId: (id: string) => void;
}

const initialCharacterState = {
  character: {
    name: null,
    advantages: [],
    disadvantages: [],
    id: null
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
          advantages: advantagesList
        })
      })),
    addDisadvantages: (disadvantageList) =>
      set((state) => ({
        character: (state.character = {
          ...state.character,
          disadvantages: disadvantageList
        })
      })),
    addId: (id) =>
      set((state) => ({
        character: (state.character = {
          ...state.character,
          id: id
        })
      }))
  }))
);

export const useToggleStore = create(ToggleStore);
