import React from 'react'
import { NavLink } from 'react-router-dom'

import classes from './SideDrawer.module.css'

export default props => {
	let drawerStyles = [classes.SideDrawer_container]
	drawerStyles.push(props.show ? classes.open : classes.close)
	return (
		<nav className={drawerStyles.join(' ')}>
			<ul>
				<li>
					<NavLink to="/threads" exact>
						THREADS
					</NavLink>
				</li>
				<li>
					<NavLink to="/home" exact>
						FRIENDS
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}
