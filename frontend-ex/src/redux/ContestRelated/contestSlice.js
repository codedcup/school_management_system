import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contests: [],
  currentContest: null,
  loading: false,
  error: null,
  response: null,
};

const contestSlice = createSlice({
  name: 'contest',
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
    },
    getSuccess: (state, action) => {
      state.contests = action.payload;
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getFailed: (state, action) => {
      state.response = action.payload;
      state.loading = false;
      state.error = null;
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    postDone: (state) => {
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getContestSuccess: (state, action) => {
      state.currentContest = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  getRequest,
  getSuccess,
  getFailed,
  getError,
  postDone,
  getContestSuccess,
} = contestSlice.actions;

export const contestReducer = contestSlice.reducer;