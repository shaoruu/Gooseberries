import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import NavigationOption from './NavigationOption/NavigationOption'
import Dropdown from '../DropdownMenu/DropdownMenu'
import classes from './NavigationOptions.module.css'

const navigationOptions = props => {
	let navOpts = null
	if (props.isLoggedIn) {
		navOpts = (
			<>
				<NavigationOption link="/home" exact>
					<FontAwesomeIcon icon="home" />
				</NavigationOption>
				<NavigationOption link="/profile" exact>
					<FontAwesomeIcon icon="user" />
					<FontAwesomeIcon icon="cog" />

					{/* <div class="menu">
						Menu Item
						
					</div> */}
				</NavigationOption>
				<Dropdown />
				{/* <NavigationOption link="/logout">Log Out</NavigationOption> */}
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
	return <ul className={classes.NavigationOptions}>{navOpts}</ul>
}

export default navigationOptions
