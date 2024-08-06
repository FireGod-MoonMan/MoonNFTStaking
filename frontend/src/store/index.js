import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import blockchainReducer from './reducer'
import { configureStore } from "@reduxjs/toolkit";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}
  
const rootReducer = combineReducers({
    blockchain: blockchainReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
})
  
let persistor = persistStore(store)

export {
    store,
    persistor,
}