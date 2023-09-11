import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // currentPage: 1,
  // totalPages: 0,
  darkMode: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    // setPage: (state, action) => {
    //   state.currentPage = action.payload;
    // },
    uiOut: () => {
      return initialState;
    },
  },
});

export const { setDarkMode, uiOut } = uiSlice.actions;

// export const selectCurrentPage = (state) => state.ui.currentPage;
export const selectDarkMode = (state) => state.ui.darkMode;

export default uiSlice.reducer;
