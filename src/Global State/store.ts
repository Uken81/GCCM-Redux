import { CharacterObj, SelectOptionObj } from './../../types';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface ToggleStoreType {
  toggleKey: string;
  toggleAdvantages: () => void;
  toggleDisadvantages: () => void;
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
  selectedOptions: SelectOptionObj[];
  resetSelectedOptions: () => void;
  addSelectedOption: (selected: SelectOptionObj[]) => void;
  resetCharacter: () => void;
  addName: (name: string) => void;
  addAdvantages: (advantagesList: string[]) => void;
  addDisadvantages: (disadvantageList: string[]) => void;
  addId: (id: string) => void;
}

interface InitialCharacterType {
  character: CharacterObj;
}

const initialCharacterState: InitialCharacterType = {
  character: {
    name: '',
    advantages: [],
    disadvantages: [],
    id: ''
  }
};

export const useCharacterStore = create<CharacterStoreType>(
  devtools(
    (set) => ({
      ...initialCharacterState,
      selectedOptions: [],
      resetSelectedOptions: () => set(() => ({ selectedOptions: [] })),
      //Why does below throw TS error??
      // resetSelectedOptions: () => set((state) => (state.selectedOptions = [])),
      addSelectedOption: (selectedOptionArr: SelectOptionObj[]) =>
        set(() => ({ selectedOptions: selectedOptionArr })),
      resetCharacter: () => set(initialCharacterState),
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
    }),
    {}
  )
);
