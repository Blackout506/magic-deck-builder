import React from "react";
import { Link } from "react-router-dom";

import classes from "./NavItem.module.css";

const navitem = (props) => {
	let classNames = [classes.Navitem];

	if (props.sidedrawer) {
		classNames = [classes.Sideitem];
	}
	if (props.hidden) {
		classNames.push(classes.Hidden);
	}
	return(
		<Link className = {classNames.join(" ")} to = {"/" + props.text.split(" ").join("")} onClick = {props.clicked}>
			{props.text}
		</Link>
	)
}



export default navitem;
