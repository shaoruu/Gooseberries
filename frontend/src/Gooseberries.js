import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

// FontsAwesome imports
import { library } from '@fortawesome/fontawesome-svg-core'
import {
	faHome,
	faUser,
	faUserCog,
	faCogs,
	faQuestionCircle,
	faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'

import Layout from './hoc/Layout/Layout'
import RouterListener from './hoc/RouteListener/RouteListener'
import { AUTH_TOKEN } from './constants'
import Home from './views/general/Home/Home'

library.add(faHome, faUser, faUserCog, faCogs, faQuestionCircle, faSignOutAlt)

class Gooseberries extends Component {
	state = {
		auth: false
	}

	handleAuth = () => {
		if (localStorage.getItem(AUTH_TOKEN)) this.setState({ auth: true })
		else this.setState({ auth: false })
	}

	render() {
		return (
			<Layout>
				<RouterListener checkAuth={this.handleAuth}>
					<Switch>
						<Route to="/home" component={Home} />
						{/* <Route to="/profile/:username" component={Profile} /> */}
					</Switch>
				</RouterListener>
			</Layout>
		)
	}
}

export default Gooseberries
