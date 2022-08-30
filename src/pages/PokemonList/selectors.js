import { initialState } from './reducer';
import { createSelector } from 'reselect';

const selectWebState = (state) => {
    return state || initialState;
}

const selectGetName = createSelector(selectWebState, (state) =>  state.pokemonReducer);

export {
    selectGetName
}