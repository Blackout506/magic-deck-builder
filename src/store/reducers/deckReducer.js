import * as actionTypes from '../actions/actionTypes';

const initialState = {
  deck: [],
  deckList: null,
  loadingPost: false,
  loadingGet: false
};

const saveDeck = (state, action) => {
  return {
    ...state,
    deck: action.deckData
  };
};

//Post deck functions
const postDeckStart = (state, action) => {
	return {
		...state,
		loadingPost: true
	};
};

const postDeckSuccess = (state, action) => {
	return {
		...state,
		loadingPost: false
	};
};

const postDeckFail = (state, action) => {
	return {
		...state,
		loadingPost: false,
		error: action.error
	};
};

//Fetch deck functions
const fetchDeckListStart = (state, action) => {
	return {
		...state,
		loadingGet: true
	};
};

const fetchDeckListSuccess = (state, action) => {
	return {
		...state,
    loadingGet: false,
		deckList: action.deckList
	};
};

const fetchDeckListFail = (state, action) => {
	return {
		...state,
		loadingGet: false,
		error: action.error
	};
};



const deckReducer = (state = initialState, action) => {
  switch (action.type) {
    //Save deck in global state
    case actionTypes.SAVE_DECK: return saveDeck(state, action);
    //Post item cases
    case actionTypes.POST_DECK_START: return postDeckStart(state, action);
    case actionTypes.POST_DECK_SUCCESS: return postDeckSuccess(state, action);
    case actionTypes.POST_DECK_FAIL: return postDeckFail(state, action);
    //Fetch list cases
    case actionTypes.FETCH_DECK_LIST_START: return fetchDeckListStart(state, action);
    case actionTypes.FETCH_DECK_LIST_SUCCESS: return fetchDeckListSuccess(state, action);
    case actionTypes.FETCH_DECK_LIST_FAIL: return fetchDeckListFail(state, action);

    default: return state;
  };
};

export default deckReducer;
