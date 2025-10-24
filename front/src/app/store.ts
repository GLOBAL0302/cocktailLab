import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../features/user/userSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist';
import { cocktailsReducer } from '../features/cocktail/cocktailSlice';

const persistConfig = {
  key: 'store',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  user: persistReducer(persistConfig, userReducer),
  cocktails: cocktailsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type Rootstate = ReturnType<typeof store.getState>;
