import * as actionTypes from './actionTypes';
// import axios from "../../axios";

export const saveDeck = (deckData) => {
	return {
		type: actionTypes.SAVE_DECK,
    deckData: deckData
	};
};
