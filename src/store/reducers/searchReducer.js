import * as actionTypes from '../actions/actionTypes';

const initialState = {
  results: [],
  error: null,
  loading: false
}

const searchStart = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

const searchSuccess = (state, action) => {
  return {
    ...state,
    results: action.results,
    loading: false
  };
};

const searchFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  };
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_START: return searchStart(state, action);
    case actionTypes.SEARCH_SUCCESS: return searchSuccess(state, action);
    case actionTypes.SEARCH_FAIL: return searchFail(state, action);
    default: return state;
  };
};

export default searchReducer;
