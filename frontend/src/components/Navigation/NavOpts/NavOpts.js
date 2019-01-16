import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import { Query } from 'react-apollo'

import classes from './NavOpts.module.css'
import NavOpt from './NavOpt/NavOpt'
import { ME_QUERY } from '../../../graphql/queries'
import { AUTH_TOKEN } from '../../../constants'

export default props => {
	let dropdownStyles = [classes.NavOpts_dropdown_menu]
	if (!props.showDropdown) dropdownStyles.push(classes.dropdown_close)

	return localStorage.getItem(AUTH_TOKEN) ? (
		<>
			<nav className={classes.NavOpts_main}>
				<NavOpt link="/home">
					<FontAwesomeIcon icon="home" style={{ color: '#eeeeee' }} size="2x" />
				</NavOpt>
			</nav>
			<div className={classes.NavOpts_side_options}>
				<div onClick={props.toggleDropdown}>
					<FontAwesomeIcon icon="user-cog" style={{ color: '#eeeeee' }} size="2x" />
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
	) : (
		<>
			<nav className={classes.NavOpts_main}>
				<NavOpt link="/register">
					<FontAwesomeIcon icon="user-plus" style={{ color: '#eeeeee' }} size="2x" />
				</NavOpt>
			</nav>
			<div className={classes.NavOpts_side_options}>
				<NavOpt link="/login">
					<FontAwesomeIcon
						icon="sign-in-alt"
						style={{ color: '#eeeeee' }}
						size="2x"
					/>
				</NavOpt>
			</div>
		</>
	)
}
