// import {applyMiddleware, createStore} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import sagas from '../saga/rootSaga';
import rootReducer from '../reducers/rootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export default (initialState: any = {}) => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [];
  middleware.push(sagaMiddleware);
  // const storeValue = createStore(
  //   persistedReducer,
  //   initialState,
  //   applyMiddleware(...middleware),
  // );
  const storeValue = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => [
      ...getDefaultMiddleware({
        serializableCheck: false,
      }).concat(sagaMiddleware),
    ],
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
  });
  const persistorValue = persistStore(storeValue);
  if (sagaMiddleware) {
    sagaMiddleware.run(sagas);
  }
  return {store: storeValue, persistor: persistorValue};
};
