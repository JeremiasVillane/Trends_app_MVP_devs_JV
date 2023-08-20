import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage/session";
import usersReducer from "./UsersSlice";
import chatReducer from "./chatSlice";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    users: usersReducer,
    chat: chatReducer,
  })
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    });
    return middleware.concat(thunk);
  },
  devTools: import.meta.env.VITE_NODE_ENV !== "production",
});

const persistor = persistStore(store);

export { store, persistor };
