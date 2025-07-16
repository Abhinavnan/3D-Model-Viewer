import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  models: [],
  message: '',
};

const modelDetailsSlice = createSlice({
  name: 'modelDetails',
  initialState,
  reducers: {
    updateModelDetails: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetModelDetails: () => initialState,
  },
});

export const { updateModelDetails, resetModelDetails } = modelDetailsSlice.actions;
export default modelDetailsSlice.reducer;


