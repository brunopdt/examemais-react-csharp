import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import loginSlice from "./reducers/loginSlice";

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({ 
  login: loginSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
    thunk: {
      extraArgument: ""
    }
  })
})

export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store)