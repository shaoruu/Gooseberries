import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class RouteListener extends Component {
	state = {
		prevPath: '/home'
	}

	componentWillMount() {
		this.unlisten = this.props.history.listen((location, action) => {
			if (this.state.prevPath !== location.pathname) {
				this.props.checkAuth()
				this.setState({ prevPath: location.pathname })
			}
		})
	}
	componentWillUnmount() {
		this.unlisten()
	}
	render() {
		return <div>{this.props.children}</div>
	}
}

export default withRouter(RouteListener)
