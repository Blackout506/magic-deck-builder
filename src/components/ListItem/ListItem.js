import React from "react";

import classes from "./ListItem.module.css";

const listItem = (props) => {

	let item = null;

	if (props.listType === "deck") {
		item = (
			<article className = {classes.Deck} onClick = {props.clicked}>
				<h3>{props.name}</h3>
				<p></p>
			</article>
		)
	}

	return (
		item
	);
}

export default listItem;
