import axios from "../config/axios";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage"; // default: localStorage if web, AsyncStorage if react-native
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

const persistConfig = {
  key: "bakery",
  storage,
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  }),
});

store.subscribe(() => {
  const token = store.getState()?.auth?.token;

  if (token) {
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  }
});

const persistor = persistStore(store);

export { store, persistor };
