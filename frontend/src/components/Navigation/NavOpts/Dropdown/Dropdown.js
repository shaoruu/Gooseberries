import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'

import classes from './Dropdown.module.css'

export default props => {
	let dropdownStyles = [classes.Dropdown_menu]
	if (!props.showDropdown) dropdownStyles.push(classes.dropdown_close)

	return (
		<div className={classes.Dropdown_options}>
			<div onClick={props.toggleDropdown}>
				<div className={classes.UserCog}>
					<FontAwesomeIcon icon="user-cog" style={{ color: '#eeeeee' }} size="2x" />
				</div>
				<div className={dropdownStyles.join(' ')}>
					<NavLink to="/settings">
						<FontAwesomeIcon icon="cogs" style={{ color: '#eeeeee' }} size="2x" />
						<h1>Settings</h1>
					</NavLink>
					<NavLink to="/help">
						<FontAwesomeIcon
							icon="question-circle"
							style={{ color: '#eeeeee' }}
							size="2x"
						/>
						<h1>Help Center</h1>
					</NavLink>
					<NavLink to="/logout">
						<FontAwesomeIcon
							icon="sign-out-alt"
							style={{ color: '#eeeeee' }}
							size="2x"
						/>
						<h1>Logout</h1>
					</NavLink>
				</div>
			</div>
		</div>
	)
}
