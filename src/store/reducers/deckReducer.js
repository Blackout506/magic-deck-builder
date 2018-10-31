import * as actionTypes from '../actions/actionTypes';

const initialState = {
  deck: []
};

const saveDeck = (state, action) => {
  return {
    ...state,
    deck: action.deckData
  }
};

const deckReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_DECK: return saveDeck(state, action);
    default: return state;
  };
};

export default deckReducer;
