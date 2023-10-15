import { configureStore, createSlice } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux';

const userInitialState = {
    userData: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        signOutUser: (state) => {
            state.userData = null; // Reset user data to null on sign out.
        },
    },
});

const rootReducer = combineReducers({
    user: userSlice.reducer,
})

const persistConfig = {
    key: 'root',
    storage,  
    whitelist: ['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

//Configuration for store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

//Persist Store
const persistor = persistStore(store);

export const { setUserData, signOutUser } = userSlice.actions;

export {store, persistor};