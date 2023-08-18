import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const { VITE_URL } = import.meta.env;

const initialState = {
  allUsers: [],
  searchedUsers: [],
  students: {},
  professionals: {},
  companies: [],
  currentPage: 1,
  status: true,
  darkMode: false,
  user: {},
  totalPages: 0,
};

const getMatchedUsers = createAsyncThunk(
  "users/getMatchedUsers",
  async (page) => {
    try {
      const URL = `${VITE_URL}/api/v1/search/users?type=student&page=${page}`;
      const fetch = await axios.get(URL, { withCredentials: "include" });
      const data = fetch.data;
      return data;
    } catch (error) {
      return error.response.data.error;
    }
  }
);

const getStudents = createAsyncThunk(
  "users/getStudents",
  async ({ id, page }) => {
    console.log(page);
    try {
      const URL = `${VITE_URL}/user/feed/${id}/student?page=${page}`;
      const fetch = await axios.get(URL, { withCredentials: "include" });
      const data = fetch.data;
      return data;
    } catch (error) {
      return error.response.data.error;
    }
  }
);

const getProfessionals = createAsyncThunk(
  "users/getProfessionals",
  async ({ id, page }) => {
    try {
      const URL = `${VITE_URL}/user/feed/${id}/professional?page=${page}`;
      const fetch = await axios.get(URL, { withCredentials: "include" });
      const data = fetch.data;
      return data;
    } catch (error) {
      return error.response.data.error;
    }
  }
);
const getUserInfo = createAsyncThunk("users/getUserInfo", async () => {
  try {
    const URL = `${VITE_URL}/user/profile`;
    const fetch = await axios.get(URL, { withCredentials: "include" });
    const data = fetch.data;
    return data;
  } catch (error) {
    return error.response.data.error;
  }
});

const getSearchedUsers = createAsyncThunk(
  "users/getSearchedUsers",
  async ({ name, academic_formation, academic_institution }) => {
    try {
      let query = `${VITE_URL}/search/users?name=${name}`;

      if (academic_formation)
        query += `&academic_formation=${academic_formation}`;
      if (academic_institution)
        query += `&academic_institution=${academic_institution}`;
      const searchedUsers = (await axios.get(query)).data;

      return searchedUsers;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    currentpage: (state) => {
      state.currentPage++;
    },
    setStatus: (state) => {
      state.status = !state.status;
    },
    setDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    logout: (state) => {
      state.allUsers = [];
      state.searchedUsers = [];
      state.students = {};
      state.professionals = {};
      state.companies = [];
      state.currentPage = 0;
      state.status = false;
      state.user = {};
      state.totalPages = 0;
    },
    matchUsers: (state) => {
      const studentUsers = state.students.data || [];
      const professionalUsers = state.professionals.data || [];
      const combinedUsers = [...studentUsers, ...professionalUsers];
      const sortedUsers = combinedUsers.sort(
        (userA, userB) => userB.matchscore - userA.matchscore
      );
      const newUsers = sortedUsers.filter(
        (newuser) =>
          !state.allUsers.some(
            (existingUser) => existingUser.user.id === newuser.user.id
          )
      );
      state.allUsers = state.allUsers.concat(newUsers);
    },
    addCompany: (state, action) => {
      state.companies = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchedUsers.pending, (state) => {
        state.searchedUsers = []; //Esto queda vacío porque despues podemos poner que si searchedUsers.length === 0 muestre un símbolo de carga
      })
      .addCase(getSearchedUsers.fulfilled, (state, action) => {
        state.searchedUsers = action.payload;
      })
      .addCase(getUserInfo.pending, () => {})
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        console.log(action.payload);
        state.students = action.payload;
      })
      .addCase(getStudents.pending, (state) => {})
      .addCase(getStudents.rejected, (state, action) => {})
      .addCase(getProfessionals.fulfilled, (state, action) => {
        state.professionals = action.payload;
      })
      .addCase(getProfessionals.rejected, (state, action) => {});
  },
});

export default usersSlice.reducer;

// export of the selectors of the global state

export { getProfessionals, getStudents };
//export const {addCompany, matchUsers, currentpage, setStatus, logout, setDarkMode} = usersSlice.actions;
// export const selectAllUsers = (state) => state.users.allUsers;

export { getSearchedUsers, getUserInfo, getMatchedUsers };
export const {
  test,
  addCompany,
  setDarkMode,
  matchUsers,
  currentpage,
  setStatus,
  logout,
} = usersSlice.actions;
export const selectAllUsers = (state) => state.users?.allUsers;
export const selectSearchedUsers = (state) => state.users.searchedUsers;
export const selectStudents = (state) => state.users.students;
export const selectProfessionals = (state) => state.users.professionals;
export const selectCompanies = (state) => state.users.companies;
export const selectUserProfile = (state) => state.users.user;
export const selectTotalPages = (state) => state.users.totalPages;
export const selectCurrentPage = (state) => state.users.currentpage;
export const selectStatus = (state) => state.users.status;
export const selectDarkMode = (state) => state.users.darkMode;
