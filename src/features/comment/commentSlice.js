import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      // Comments are handled in tweet slice for simplicity
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { addComment, setLoading } = commentSlice.actions;
export default commentSlice.reducer;