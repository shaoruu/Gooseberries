import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classes from './NavOpts.module.css'
import NavOpt from './NavOpt/NavOpt'
import { AUTH_TOKEN } from '../../../constants'
import Dropdown from './Dropdown/Dropdown'

export default props => {
	return localStorage.getItem(AUTH_TOKEN) ? (
		<>
			<nav className={classes.NavOpts_main}>
				<NavOpt link="/home">
					<FontAwesomeIcon icon="home" style={{ color: '#eeeeee' }} size="2x" />
				</NavOpt>
			</nav>
			<Dropdown
				showDropdown={props.showDropdown}
				toggleDropdown={props.toggleDropdown}
			/>
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
