import create from 'zustand';
import { devtools } from 'zustand/middleware';

let ToggleStore = (set) => ({
  isChoosingAdvantages: true,
  toggleAdvantages: () => set({ isChoosingAdvantages: true }),
  toggleDisadvantages: () => set({ isChoosingAdvantages: false }),

  showSuccessAlert: false,
  toggleShow: () => set({ showSuccessfulSaveAlert: true }),
  toggleHide: () => set({ showSuccessfulSaveAlert: false })
});

const initialCharacterState = {
  character: {
    characterName: '',
    selectedAdvantages: [],
    selectedDisadvantages: [],
    currentCharacterId: ''
  }
};

let characterStore = (set) => ({
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
});
characterStore = devtools(characterStore);

export const useToggleStore = create(ToggleStore);
export const useCharacterStore = create(characterStore);
