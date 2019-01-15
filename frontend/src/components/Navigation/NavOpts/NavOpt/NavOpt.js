import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './NavOpt.module.css'

export default props => (
	<li className={classes.NavOpt_container}>
		<NavLink to={props.link} exact={props.exact} activeClassName={classes.active}>
			{props.children}
		</NavLink>
	</li>
)
