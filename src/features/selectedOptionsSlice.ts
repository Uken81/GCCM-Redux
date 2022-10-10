import { RootState } from 'store';
import { createSlice } from '@reduxjs/toolkit';
import { SelectOptionObj } from './../../types';

interface selectedOptionsState {
  selectedOptions: SelectOptionObj[];
}

const initialState: selectedOptionsState = {
  selectedOptions: []
};

export const selectedOptionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    addSelectedOption: (state, action) => {
      state.selectedOptions = action.payload;
    },
    resetSelectedOptions: (state) => {
      state.selectedOptions = initialState.selectedOptions;
    }
  }
});

export const { addSelectedOption, resetSelectedOptions } = selectedOptionsSlice.actions;

export const selectSelectedOptions = (state: RootState) => state.options;

export default selectedOptionsSlice.reducer;
