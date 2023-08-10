import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./UsersSlice";
import chatReducer from './chatSlice';


const store = configureStore({
    reducer: {
        users: usersReducer,
        chat: chatReducer,
    },
    // middleware of the redux devtools
    devTools: true,
});

export default store;