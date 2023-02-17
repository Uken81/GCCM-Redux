import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';
interface CharacterState {
  name: string;
  advantages: string[];
  disadvantages: string[];
  id: string;
}

const initialState: CharacterState | undefined = {
  name: '',
  advantages: [],
  disadvantages: [],
  id: ''
};

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    resetCharacter: () => initialState,
    setName: (state, action) => {
      state.name = action.payload;
    },
    storeAdvantageList: (state, action) => {
      state.advantages = action.payload;
    },
    storeDisadvantageList: (state, action) => {
      state.disadvantages = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    }
  }
});

export const { resetCharacter, setName, storeAdvantageList, storeDisadvantageList, setId } =
  characterSlice.actions;

export const selectCharacter = (state: RootState) => state.options;

export default characterSlice.reducer;
