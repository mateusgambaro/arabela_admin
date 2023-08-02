import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunkMiddleware from 'redux-thunk';
import loginReducer from './reducers/login/index';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  login: loginReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
  const store = createStore(persistedReducer, applyMiddleware(thunkMiddleware));
  const persistor = persistStore(store);
  return { store, persistor };
}
