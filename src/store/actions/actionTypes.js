// Update deck in global state
export const SAVE_DECK = 'SAVE_DECK';

// Search actions (without format filter)
export const SEARCH_START = 'SEARCH_START';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAIL = 'SEARCH_FAIL';

// Search actions (with format filter)
export const SEARCH_WITH_FORMAT_START = 'SEARCH_WITH_FORMAT_START';
export const SEARCH_WITH_FORMAT_SUCCESS = 'SEARCH_WITH_FORMAT_SUCCESS';
export const SEARCH_WITH_FORMAT_FAIL = 'SEARCH_WITH_FORMAT_FAIL';

// Post deck to database
export const POST_DECK_START = 'POST_DECK_START';
export const POST_DECK_SUCCESS = 'POST_DECK_SUCCESS';
export const POST_DECK_FAIL = 'POST_DECK_FAIL';

// Fetch deck list from database
export const FETCH_DECK_LIST_START = 'FETCH_DECK_LIST_START';
export const FETCH_DECK_LIST_SUCCESS = 'FETCH_DECK_LIST_SUCCESS';
export const FETCH_DECK_LIST_FAIL = 'FETCH_DECK_LIST_FAIL';

//Sign in actions
export const SIGN_IN_START = 'SIGN_IN_START';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAIL = 'SIGN_IN_FAIL';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_AUTH_REDIRECT_PATH = 'SET_AUTH_REDIRECT_PATH';

//Reset search results
export const RESET_RESULTS = 'RESET_RESULTS';