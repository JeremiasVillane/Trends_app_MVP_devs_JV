import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage/session";
import thunk from "redux-thunk";
import chatReducer from "./chatSlice";
import usersReducer from "./usersSlice";
import uiReducer from "./uiSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    ui: uiReducer,
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
