import { CharacterObj } from './../../types';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface ToggleStoreType {
  toggleKey: string;
  toggleAdvantages: (toggleKey: string) => void;
  toggleDisadvantages: (toggleKey: string) => void;
}

export const useToggleStore = create<ToggleStoreType>((set) => ({
  toggleKey: 'advantages',
  toggleAdvantages: () => set({ toggleKey: 'advantages' }),
  toggleDisadvantages: () => set({ toggleKey: 'disadvantages' })

  // showSuccessAlert: false,
  // toggleShow: () => set({ showSuccessfulSaveAlert: true }),
  // toggleHide: () => set({ showSuccessfulSaveAlert: false })
}));

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
    name: '',
    advantages: [],
    disadvantages: [],
    id: ''
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

// export const useToggleStore = create(ToggleStore);
