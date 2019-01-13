import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import Home from './Home/Home'
import Login from './Login/Login'
import Logout from './Logout/Logout'
import Post from './Post/Post'
import Profile from './Profile/Profile'
import Register from './Registration/Register/Register'
import MoreInfo from './Registration/MoreInfo/MoreInfo'
// import Thread from './Thread/Thread'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import RouteListener from '../../hoc/RouteListener/RouteListener'
import { AUTH_TOKEN } from '../../constants'

class Gooseberries extends Component {
	state = {
		auth: false
	}

	componentDidMount() {
		this.handleAuth()
	}

	handleAuth = () => {
		console.log('changed!')
		if (localStorage.getItem(AUTH_TOKEN)) this.setState({ auth: true })
		else this.setState({ auth: false })
	}

	render() {
		return (
			<div>
				<Toolbar isLoggedIn={this.state.auth} handleLogo={this.handleLogo} />
				<RouteListener checkAuth={this.handleAuth}>
					<Route path="/home" component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/logout" component={Logout} />
					<Route path="/profile/:userId" component={Profile} />
					<Route path="/register" exact component={Register} />
					<Route path="/register/moreinfo" component={MoreInfo} />
					<Route path="/post/:postId" component={Post} />
					{/* To catch all other undefined routes: */}
					<Route path="/" render={() => <Redirect to="/home" />} />
				</RouteListener>
			</div>
		)
	}
}

export default Gooseberries
