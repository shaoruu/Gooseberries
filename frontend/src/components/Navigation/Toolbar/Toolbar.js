import React from 'react'

import NavigationOptions from '../NavigationOptions/NavigationOptions'
import Logo from '../NavigationOptions/Logo/Logo'

const toolBar = props => {
	return (
		<header>
			<Logo />
			<NavigationOptions isLoggedIn={props.isLoggedIn} />
		</header>
	)
}

export default toolBar
