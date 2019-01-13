import React from 'react'

import NavigationOption from './NavigationOption/NavigationOption'

const navigationOptions = props => {
	let navOpts = null
	if (props.isLoggedIn) {
		navOpts = (
			<>
				<NavigationOption link="/home" exact>
					Home
				</NavigationOption>
				<NavigationOption link="/profile" exact>
					Profile
				</NavigationOption>
				<NavigationOption link="/logout">Log Out</NavigationOption>
			</>
		)
	} else {
		navOpts = (
			<>
				<NavigationOption link="/login" exact>
					Login
				</NavigationOption>
				<NavigationOption link="/register" exact>
					Sign Up
				</NavigationOption>
			</>
		)
	}
	return <ul>{navOpts}</ul>
}

export default navigationOptions
