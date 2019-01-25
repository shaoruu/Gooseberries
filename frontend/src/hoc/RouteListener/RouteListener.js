import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { PrevPathProvider } from '../../contexts/RouterContext'

class RouteListener extends Component {
	state = {
		prevPath: null
	}

	componentWillMount() {
		this.unlisten = this.props.history.listen((location, action) => {
			if (this.state.prevPath !== location.pathname) {
				this.setState({ prevPath: location.pathname })
			}
		})
	}
	componentWillUnmount() {
		this.unlisten()
	}
	render() {
		// console.log(this.state.prevPath)
		return (
			<PrevPathProvider value={this.state.prevPath}>
				{this.props.children}
			</PrevPathProvider>
		)
	}
}

export default withRouter(RouteListener)
