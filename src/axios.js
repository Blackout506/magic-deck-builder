import axios from "axios";

const instance = axios.create({
	baseURL: "https://deckbuilder-4dde3.firebaseio.com/"
});

export default instance;
