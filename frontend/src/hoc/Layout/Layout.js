import React, { Component } from 'react'

import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import Backdrop from '../../components/Backdrop/Backdrop'

class Layout extends Component {
	state = {
		showDrawer: false
	}

	sideDrawerToggleHandler = () => {
		this.setState(prevState => {
			prevState.showDrawer = !prevState.showDrawer
			return prevState
		})
	}

	render() {
		let layoutStyles = [classes.MainLayout]
		layoutStyles.push(this.state.showDrawer ? classes.open : classes.close)
		return (
			<>
				<SideDrawer show={this.state.showDrawer} />
				<Backdrop
					show={this.state.showDrawer}
					onClick={this.sideDrawerToggleHandler}
				/>
				<div className={layoutStyles.join(' ')}>
					<Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
					<main className={classes.Content}>{this.props.children}</main>
				</div>
			</>
		)
	}
}

export default Layout
