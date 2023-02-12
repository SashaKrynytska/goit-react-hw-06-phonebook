import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import contactsSlice from '../features/contacts/redux/contacts.slice';
import contactsReducer from '../features/contacts/redux/contacts.slice';
import { filterReducer } from 'features/contacts/redux/filter.slice';

const persistContactsConfig = {
  key: 'contacts',
  storage,
  blacklist: ['filter'],
  // whitelist: ['contacts'],
};
// const persistedContactsReducer = persistReducer(
//   persistContactsConfig,
//   contactsSlice.reducer
// );
const rootReducer = combineReducers({
  // [contactsSlice.name]: persistedContactsReducer,
  contacts: contactsReducer,
  filter: filterReducer,
});

const persistedReducer = persistReducer(persistContactsConfig, rootReducer);

const store = configureStore({
  // reducer: rootReducer,
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const persistor = persistStore(store);

export { store, persistor };
