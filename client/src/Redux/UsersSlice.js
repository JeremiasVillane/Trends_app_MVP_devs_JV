import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const {VITE_URL} = import.meta.env;

const initialState = {
    allUsers: [],
    searchedUsers: [],
    students: [],
    professionals: [],
    companies: [],
    user: {},
    totalPages: 0,
    test: false,
};

const getMatchedUsers = createAsyncThunk("users/getMatchedUsers", async (page) => {
    try {
        const URL = `${VITE_URL}/api/v1/search/users?type=student&page=${page}`;
        const fetch = await axios.get(URL, {withCredentials: "include"});
        const data = fetch.data;
        return data;
    } catch (error) {
        return error.response.data.error
    }
})
const getUserInfo = createAsyncThunk("users/getUserInfo", async () => {
    try {
        const URL = `${VITE_URL}/api/v1/user/profile`;
        const fetch = await axios.get(URL, {withCredentials: "include"});
        const data = fetch.data;
        return data;
    } catch (error) {
        return error.response.data.error;
    }
} )

const getSearchedUsers = createAsyncThunk("users/getSearchedUsers", async({name, academic_formation, academic_institution}) =>{
    try {
    console.log("ACTION OK")
    let query = `http://localhost:3001/api/v1/search/users?name=${name}`
    if (academic_formation) query += `&academic_formation=${academic_formation}`
    if (academic_institution) query += `&academic_institution=${academic_institution}`
    console.log("Query: " + query)
    const searchedUsers = (await axios.get(query)).data
    console.log(searchedUsers);
    return searchedUsers;
    } catch (error) {
    throw new Error(error.message);
    }
})


const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        test:(state) =>{
            state.test = !state.test;
        },
        //?SE AGREGA ACCION PARA CARGAR LA COMPAÑIA Y SUS TRABAJOS EN EL STORE GLOBAL
        addCompany:(state,action)=>{
            state.companies=action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSearchedUsers.pending, (state)=>{
                state.searchedUsers = []; //Esto queda vacío porque despues podemos poner que si searchedUsers.length === 0 muestre un símbolo de carga
            })
            .addCase(getSearchedUsers.fulfilled, (state, action)=>{
                state.searchedUsers = action.payload;
            })
            .addCase(getUserInfo.pending, () => {
                //console.log("cargando");
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(getMatchedUsers.pending, () => {
                //console.log("cargando");
            })
           .addCase(getMatchedUsers.fulfilled, (state, action) => {
                state.totalPages = action.payload.totalPages;
                const newUsers = action.payload.data.filter(newUser => (
                !state.allUsers.some(existingUser => existingUser.id === newUser.id)
            ));
                state.allUsers = state.allUsers.concat(newUsers);
            }) 
            .addCase(getMatchedUsers.rejected, (state, action) => {
                console.log(action.payload);
            })
    }
})

export default usersSlice.reducer;

// export of the selectors of the global state
export {getSearchedUsers, getUserInfo, getMatchedUsers};
export const {test, addCompany} = usersSlice.actions;
export const selectAllUsers = (state) => state.users.allUsers;
export const selectSearchedUsers = (state) => state.users.searchedUsers;
export const selectStudents = (state) => state.users.students;
export const selectProfessionals = (state) => state.users.professionals;
export const selectCompanies = (state) => state.users.companies;
export const selectUserProfile = (state) => state.users.user;
export const selectTotalPages = (state) => state.users.totalPages;
