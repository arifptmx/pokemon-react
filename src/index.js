import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import PokemonList from './pages/PokemonList/index';
import pokemonReducer from './pages/PokemonList/reducer';
import pokemonSaga from './pages/PokemonList/saga'; 

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  pokemonReducer
})
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(pokemonSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PokemonList />
  </Provider>
);

reportWebVitals();
