import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import NavigationOption from '../NavigationOptions/NavigationOption/NavigationOption'
import classes from './DropdownMenu.module.css'

class Dropdown extends Component {
	state = {
		showMenu: false
	}

	showMenu = e => {
		e.preventDefault()

		this.setState(
			{
				showMenu: true
			},
			() => {
				document.addEventListener('click', this.closeMenu)
			}
		)
	}

	closeMenu = () => {
		this.setState({ showMenu: false }, () => {
			document.removeEventListener('click', this.closeMenu)
		})
	}

	render() {
		return (
			<div className={classes.DropdownMenu}>
				<NavigationOption link="/profile" exact onClick={this.showMenu}>
					<FontAwesomeIcon icon="user" />
					<FontAwesomeIcon icon="cog" />

					{/* <div class="menu">
						Menu Item
						
					</div> */}
				</NavigationOption>
				{this.state.showMenu ? (
					<div className="menu">
						<button>Menu item 1</button>
						<button>Menu item 2</button>
						<button>Menu item 3</button>
					</div>
				) : null}
			</div>
		)
	}
}

export default Dropdown
