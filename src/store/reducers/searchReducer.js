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

const searchWithFormatStart = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

const searchWithFormatSuccess = (state, action) => {
  return {
    ...state,
    results: action.results,
    loading: false
  };
};

const searchWithFormatFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  };
};

const resetResults = (state, action) => {
  return {
    ...state,
    results: action.results
  };
};


const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_START: return searchStart(state, action);
    case actionTypes.SEARCH_SUCCESS: return searchSuccess(state, action);
    case actionTypes.SEARCH_FAIL: return searchFail(state, action);
    case actionTypes.SEARCH_WITH_FORMAT_START: return searchWithFormatStart(state, action);
    case actionTypes.SEARCH_WITH_FORMAT_SUCCESS: return searchWithFormatSuccess(state, action);
    case actionTypes.SEARCH_WITH_FORMAT_FAIL: return searchWithFormatFail(state, action);
    case actionTypes.RESET_RESULTS: return resetResults(state, action);
    default: return state;
  };
};

export default searchReducer;
