import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import classes from './SideDrawer.module.css'
import DrawerHeader from './DrawerHeader/DrawerHeader'

export default class SideDrawer extends Component {
	render() {
		let drawerStyles = [classes.SideDrawer_container]
		drawerStyles.push(this.props.show ? classes.open : classes.close)
		return (
			<nav className={drawerStyles.join(' ')}>
				<DrawerHeader />
				<ul>
					<li>
						<button className={classes.Drawer_btn}>CREATE</button>
					</li>
					<li>
						<NavLink to="/threads" exact>
							<button className={classes.Drawer_btn}>THREADS</button>
						</NavLink>
					</li>
					<li>
						<NavLink to="/home" exact>
							<button className={classes.Drawer_btn}>FRIENDS</button>
						</NavLink>
					</li>
				</ul>
			</nav>
		)
	}
}
