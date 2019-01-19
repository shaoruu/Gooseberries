import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import { Query } from 'react-apollo'

import classes from './Dropdown.module.css'
import { ME_QUERY } from '../../../../graphql/queries'

export default class Dropdown extends Component {
	state = {
		open: false
	}

	componentWillMount() {
		document.addEventListener('mousedown', this.handleClicks, false)
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClicks, false)
	}

	handleButtonToggle = () => {
		this.setState(prevState => {
			prevState.open = !prevState.open
			return prevState
		})
	}

	handleClicks = e => {
		if (this.node && !this.node.contains(e.target)) {
			this.setState({ open: false })
		}
	}

	render() {
		let dropdownStyles = [classes.Dropdown_menu]
		if (!this.state.open) dropdownStyles.push(classes.dropdown_close)

		return (
			<div className={classes.Dropdown_options} ref={node => (this.node = node)}>
				<div onClick={this.handleButtonToggle}>
					<div className={classes.UserCog}>
						<FontAwesomeIcon
							icon="user-cog"
							style={{ color: '#eeeeee' }}
							size="2x"
						/>
					</div>
					<div className={dropdownStyles.join(' ')}>
						<Query query={ME_QUERY}>
							{({ loading, data }) =>
								!loading && (
									<NavLink to={`/profile/${data.me.username}`}>
										<FontAwesomeIcon
											icon="user-circle"
											style={{ color: '#eeeeee' }}
											size="2x"
										/>
										<h1>User Profile</h1>
									</NavLink>
								)
							}
						</Query>

						<hr className={classes.LineBreak} />
						<NavLink to="/settings">
							<FontAwesomeIcon icon="cog" style={{ color: '#eeeeee' }} size="2x" />
							<h1>Settings</h1>
						</NavLink>
						<NavLink to="/help">
							<FontAwesomeIcon
								icon="question-circle"
								style={{ color: '#eeeeee' }}
								size="2x"
							/>
							<h1>Help Center</h1>
						</NavLink>
						<hr className={classes.LineBreak} />
						<NavLink to="/logout">
							<FontAwesomeIcon
								icon="sign-out-alt"
								style={{ color: '#eeeeee' }}
								size="2x"
							/>
							<h1>Logout</h1>
						</NavLink>
					</div>
				</div>
			</div>
		)
	}
}
