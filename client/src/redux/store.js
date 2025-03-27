import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Configuration for Redux Persist
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Combine Reducers
const rootReducer = combineReducers({ user: userReducer });

// Create Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux Store with Persisted Reducer and Middleware Configuration
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create Persistor for Persisted Redux Store
export const persistor = persistStore(store);
