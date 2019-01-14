import React, { Component } from 'react'

export default class Post extends Component {
	render() {
		return <h1>{this.props.match.params.postId}</h1>
	}
}
