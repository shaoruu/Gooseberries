import React from 'react'

import NavigationOptions from '../NavigationOptions/NavigationOptions'
import Logo from '../NavigationOptions/Logo/Logo'
import classes from './Toolbar.module.css'

const toolBar = props => {
	return (
		<header className={classes.ToolBar}>
			<Logo />
			<nav>
				<NavigationOptions isLoggedIn={props.isLoggedIn} />
			</nav>
		</header>
	)
}

export default toolBar
