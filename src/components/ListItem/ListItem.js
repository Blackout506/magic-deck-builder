import React from "react";

import classes from "./ListItem.module.css";
import MiniDeckManaViewer from '../MiniDeckManaViewer/MiniDeckManaViewer';

const listItem = (props) => {

	let item = null;

	// Build deck mana used here

	if (props.listType === "deck") {
		item = (
			<article className = {classes.Deck} onClick = {props.clicked}>
				<h3>{props.name}</h3>
				<div className={classes.ManaUsed}>
					<MiniDeckManaViewer manaCost={props.manaCost}/>
				</div>
			</article>
		)
	}

	return (
		item
	);
}

export default listItem;
