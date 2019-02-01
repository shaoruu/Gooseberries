import React, { Component } from 'react'
import { Query } from 'react-apollo'

import { USER_QUERY } from '../../../graphql/queries'
import SpecificProfile from '../../../components/Social/SpecificProfile/SpecificProfile'

export default class Profile extends Component {
	componentDidMount() {
		document.title = `Profile: ${this.props.match.params.username}`
	}
	render() {
		console.log(this.props.match.params)
		let username = this.props.match.params.username
		return (
			<Query query={USER_QUERY} variables={{ username }}>
				{({ loading, error, data }) => {
					if (loading) return <h1>LOADING</h1>
					if (error) {
						console.error(error)
						return null
					}
					return <SpecificProfile user={data.user} />
				}}
			</Query>
		)
	}
}
