import * as actionTypes from './actionTypes';
import axios from "../../axios";

export const saveDeck = (deckData) => {
	return {
		type: actionTypes.SAVE_DECK,
    deckData: deckData
	};
};

// ========================================
//Actions for posting an item
export const postDeckStart = () => {
	return {
		type: actionTypes.POST_DECK_START
	};
};

export const postDeckFail = (error) => {
	return {
		type: actionTypes.POST_DECK_FAIL,
		error: error
	};
};

export const postDeckSuccess = () => {
	return {
		type: actionTypes.POST_DECK_SUCCESS,
	};
};

export const postDeck = (deckData) => {
	return dispatch => {
		dispatch(postDeckStart());
		axios.post('decks.json', deckData)
		.then (reponse => {
			dispatch(postDeckSuccess());
		})
		.catch(err => {
			dispatch(postDeckFail(err));
		});
	};
};

// ========================================
// Actions for fetching decks
export const fetchDeckListStart = () => {
	return {
		type: actionTypes.FETCH_DECK_LIST_START
	};
};

export const fetchDeckListFail = (error) => {
	return {
		type: actionTypes.FETCH_DECK_LIST_FAIL,
		error: error
	};
};

export const fetchDeckListSuccess = (deckList) => {
	return {
		type: actionTypes.FETCH_DECK_LIST_SUCCESS,
		deckList: deckList
	};
};

export const fetchDeckList = () => {
	return dispatch => {
		dispatch(fetchDeckListStart());
		axios.get("decks.json")
		.then(response => {
			let data = [];
			for (let key in response.data) {
				data.push({
					id: key,
					...response.data[key]
				});
			}
			dispatch(fetchDeckListSuccess(data));
		})
		.catch(err => {
			console.log(err);
			dispatch(fetchDeckListFail(err));
		});
	}
}
