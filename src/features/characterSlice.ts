import { createSlice } from '@reduxjs/toolkit';
interface CharacterState {
  name: string;
  advantages: string[];
  disadvantages: string[];
  id: string;
}

const initialState: CharacterState = {
  name: '',
  advantages: [],
  disadvantages: [],
  id: ''
};

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {}
});
