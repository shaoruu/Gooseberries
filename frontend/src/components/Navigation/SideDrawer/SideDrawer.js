import React, { Component } from 'react'

import classes from './SideDrawer.module.css'
import DrawerHeader from './DrawerHeader/DrawerHeader'
import DrawerOpts from './DrawerOpts/DrawerOpts'

export default class SideDrawer extends Component {
	render() {
		let drawerStyles = [classes.SideDrawer_container]
		if (!this.props.show) drawerStyles.push(classes.close)
		return (
			<nav className={drawerStyles.join(' ')}>
				<DrawerHeader />
				<DrawerOpts />
			</nav>
		)
	}
}
