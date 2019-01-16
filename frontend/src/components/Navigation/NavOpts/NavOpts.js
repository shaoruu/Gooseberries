import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'

import classes from './NavOpts.module.css'
import NavOpt from './NavOpt/NavOpt'

export default props => {
	let dropdownStyles = [classes.NavOpts_dropdown_menu]
	if (!props.showDropdown) dropdownStyles.push(classes.dropdown_close)

	console.log(props)

	return (
		<>
			<nav className={classes.NavOpts_main}>
				<NavOpt link="/home">
					<FontAwesomeIcon icon="home" style={{ color: '#eeeeee' }} size="2x" />
				</NavOpt>
			</nav>
			<div className={classes.NavOpts_dropdown}>
				<div onClick={props.toggleDropdown}>
					<NavOpt link="/home">
						<FontAwesomeIcon
							icon="user-cog"
							style={{ color: '#eeeeee' }}
							size="2x"
						/>
					</NavOpt>
					<div className={dropdownStyles.join(' ')}>
						<NavLink to="/settings">
							<FontAwesomeIcon
								icon="cogs"
								style={{ color: '#eeeeee' }}
								size="2x"
							/>
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
		</>
	)
}
