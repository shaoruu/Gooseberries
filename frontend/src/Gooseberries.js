import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

// FontsAwesome imports
import { library } from '@fortawesome/fontawesome-svg-core'
import {
	faHome,
	faUser,
	faUserCog,
	faCog,
	faQuestionCircle,
	faSignOutAlt,
	faSignInAlt,
	faUserPlus,
	faUserCircle
} from '@fortawesome/free-solid-svg-icons'

import Layout from './hoc/Layout/Layout'
import RouterListener from './hoc/RouteListener/RouteListener'
import { AUTH_TOKEN } from './constants'
import Home from './views/general/Home/Home'
import Login from './views/authentication/Login/Login'
import Logout from './views/authentication/Logout/Logout'
import Register from './views/authentication/Register/Register'

library.add(
	faHome,
	faUser,
	faUserCog,
	faUserCircle,
	faCog,
	faQuestionCircle,
	faSignInAlt,
	faSignOutAlt,
	faUserPlus
)

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
						<Route path="/home" component={Home} />
						<Route path="/login" component={Login} />
						<Route path="/logout" component={Logout} />
						<Route path="/register" component={Register} />
						<Route path="/" render={() => <Redirect push to="/home" />} />
						{/* <Route to="/profile/:username" component={Profile} /> */}
					</Switch>
				</RouterListener>
			</Layout>
		)
	}
}

export default Gooseberries
