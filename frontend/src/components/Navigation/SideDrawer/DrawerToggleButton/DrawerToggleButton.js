import React from 'react'

import classes from './DrawerToggleButton.module.css'

// props to https://www.academind.com/learn/react/snippets/navbar-side-drawer/
export default props => (
	<button className={classes.toggle_button} onClick={props.click}>
		<div className={classes.toggle_button__line} />
		<div className={classes.toggle_button__line} />
		<div className={classes.toggle_button__line} />
	</button>
)
