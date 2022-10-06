import { RootState } from './../store';
import { createSlice } from '@reduxjs/toolkit';

interface ToggleState {
  isChoosingAdvantages: boolean;
}

const initialState: ToggleState = {
  isChoosingAdvantages: true
};

export const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggleAdvantages: (state) => {
      state.isChoosingAdvantages = true;
    },
    toggleDisadvantages: (state) => {
      state.isChoosingAdvantages = false;
    }
  }
});

export const { toggleAdvantages, toggleDisadvantages } = toggleSlice.actions;

export const selectToggle = (state: RootState) => state.toggle.isChoosingAdvantages;

export default toggleSlice.reducer;
