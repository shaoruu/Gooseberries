import React from 'react'
import { NavLink } from 'react-router-dom'

import classes from './DrawerOpt.module.css'

export default props => {
	let styles = [classes.DrawerOpt_btn]
	if (props.last) styles.push(classes.last)
	return (
		<li className={classes.DrawerOpt_container}>
			<NavLink to={props.to} exact>
				<button className={styles.join(' ')}>{props.title}</button>
			</NavLink>
		</li>
	)
}
