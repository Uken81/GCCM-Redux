import { CharacterObj, SelectOptionObj } from './../../types';
import create from 'zustand';

// interface ToggleStoreType {
//   isChoosingAdvantages: boolean;
//   toggleAdvantages: () => void;
//   toggleDisadvantages: () => void;
// }

// export const useToggleStore = create<ToggleStoreType>((set) => ({
//   isChoosingAdvantages: true,
//   toggleAdvantages: () => set({ isChoosingAdvantages: true }),
//   toggleDisadvantages: () => set({ isChoosingAdvantages: false })
// }));

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

export const useCharacterStore = create<CharacterStoreType>((set) => ({
  ...initialCharacterState,
  selectedOptions: [],
  resetSelectedOptions: () => set(() => ({ selectedOptions: [] })),

  addSelectedOption: (selectedOptionArr: SelectOptionObj[]) =>
    set(() => ({ selectedOptions: selectedOptionArr })),

  resetCharacter: () => set(initialCharacterState),

  addName: (newName) => set((state) => ({ character: { ...state.character, name: newName } })),
  addAdvantages: (advantagesList) =>
    set((state) => ({ character: { ...state.character, advantages: advantagesList } })),

  addDisadvantages: (disadvantageList) =>
    set((state) => ({ character: { ...state.character, disadvantages: disadvantageList } })),

  addId: (newId) => set((state) => ({ character: { ...state.character, id: newId } }))
}));
