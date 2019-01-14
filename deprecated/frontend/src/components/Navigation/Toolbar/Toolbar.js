import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import NavigationOptions from '../NavigationOptions/NavigationOptions'
import Logo from '../NavigationOptions/Logo/Logo'
import classes from './Toolbar.module.css'

class ToolBar extends Component {
	render() {
		return (
			<>
				<header className={classes.ToolBar}>
					<Logo />
					<nav>
						<NavigationOptions isLoggedIn={this.props.isLoggedIn} />
					</nav>
				</header>
			</>
		)
	}
}

export default withRouter(ToolBar)
