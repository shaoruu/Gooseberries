import React, { Component } from 'react'

import classes from './DrawerDropdown.module.css'
import DrawerOpt from '../DrawerOpt/DrawerOpt'

export default class DrawerDropdown extends Component {
	state = {
		open: false
	}

	toggleDrawerMenu = () => {
		this.setState(prevState => {
			prevState.open = !prevState.open
			return prevState
		})
	}

	render() {
		return (
			<li className={classes.DrawerDropdown_container}>
				<button
					className={classes.DrawerDropdown_btn}
					onClick={this.toggleDrawerMenu}
				>
					TOGGLE ME
				</button>
				<div className={classes.DrawerDropdown_menu}>
					{this.props.items.map((data, index) => {
						// console.log(data)
						return (
							<ul
								key={index}
								className={classes.DrawerDropdown_opts_container}
								style={
									this.state.open ? { maxHeight: '5vh' } : { maxHeight: '0' }
								}
							>
								<DrawerOpt to={data.to} title={data.title} />
							</ul>
						)
					})}
				</div>
			</li>
		)
	}
}
