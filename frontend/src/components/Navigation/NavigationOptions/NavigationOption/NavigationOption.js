import React from 'react'
import { NavLink } from 'react-router-dom'

import classes from './NavigationOption.module.css'

const navigationOption = props => (
	<li className={classes.NavigationOption}>
		<NavLink to={props.link} exact={props.exact}>
			{props.children}
		</NavLink>
	</li>
)

export default navigationOption
