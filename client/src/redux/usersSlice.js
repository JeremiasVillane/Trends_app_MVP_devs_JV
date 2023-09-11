import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const { VITE_URL } = import.meta.env;

const initialState = {
  user: {},
  allUsers: [],
  searchedUsers: [],
  students: {},
  professionals: {},
  companies: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userLogout: () => {
      return initialState;
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
      .addCase(updateUserProfile.pending, () => {})
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
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

export const { userLogout, matchUsers, addCompany } = usersSlice.actions;

export const getMatchedUsers = createAsyncThunk(
  "users/getMatchedUsers",
  async (page) => {
    try {
      const URL = `${VITE_URL}/search/users?type=student&page=${page}`;
      const { data } = await axios.get(URL, { withCredentials: "include" });

      return data;
    } catch (error) {
      return error.response.data.error;
    }
  }
);

export const getStudents = createAsyncThunk(
  "users/getStudents",
  async ({ id, page }) => {
    try {
      const URL = `${VITE_URL}/user/feed/${id}/student?page=${page}`;
      const { data } = await axios.get(URL, { withCredentials: "include" });

      return data;
    } catch (error) {
      return error.response.data.error;
    }
  }
);

export const getProfessionals = createAsyncThunk(
  "users/getProfessionals",
  async ({ id, page }) => {
    try {
      const URL = `${VITE_URL}/user/feed/${id}/professional?page=${page}`;
      const { data } = await axios.get(URL, { withCredentials: "include" });

      return data;
    } catch (error) {
      return error.response.data.error;
    }
  }
);
export const getUserInfo = createAsyncThunk("users/getUserInfo", async () => {
  try {
    const URL = `${VITE_URL}/user/profile`;
    const { data } = await axios.get(URL, { withCredentials: "include" });

    return data;
  } catch (error) {
    return error.response.data.error;
  }
});

export const getSearchedUsers = createAsyncThunk(
  "users/getSearchedUsers",
  async ({ name, academic_formation, academic_institution }) => {
    try {
      let query = `${VITE_URL}/search/users?name=${name}`;

      if (academic_formation)
        query += `&academic_formation=${academic_formation}`;
      if (academic_institution)
        query += `&academic_institution=${academic_institution}`;
      const { data } = await axios.get(query);

      return data;
    } catch (error) {
      return error.response.data.error;
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "users/updateUserProfile",
  async (editData) => {
    try {
      const URL = `${VITE_URL}/user/${editData.id}`;
      const { data } = await axios.put(URL, editData, {
        withCredentials: "include",
      });

      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

// Thunk para subir una imagen
export const uploadImage = (formData) => async () => {
  try {
    const { data } = await axios.post(`${VITE_URL}/images/profile`, formData, {
      withCredentials: "include",
    });
    const urlImage = data.imageUrl;

    return urlImage;
  } catch (error) {
    console.error("Error subiendo imagen:", error);
  }
};

// Thunk para traer los datos de un usuario
export const getSomeUserInfo = (userId) => async () => {
  try {
    const { data } = await axios.get(`${VITE_URL}/search/user/${userId}`, {
      withCredentials: "include",
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

// Thunk para buscar usuarios por nombre y tipo
export const searchUsers = (type, page, query) => async () => {
  try {
    const URL = `${VITE_URL}/search/users?type=${type}&page=${page}&name=${query}`;
    const { data } = await axios.get(URL, { withCredentials: "include" });

    return data;
  } catch (error) {
    return error.response.data.error;
  }
};

export const selectAllUsers = (state) => state.users?.allUsers;
export const selectSearchedUsers = (state) => state.users.searchedUsers;
export const selectStudents = (state) => state.users.students;
export const selectProfessionals = (state) => state.users.professionals;
export const selectCompanies = (state) => state.users.companies;
export const selectUserProfile = (state) => state.users.user;

export default usersSlice.reducer;
