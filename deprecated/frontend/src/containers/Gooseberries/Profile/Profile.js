import React, { Component } from 'react'

export default class Profile extends Component {
	render() {
		return <h1>{this.props.match.params.userId}</h1>
	}
}
