import React, { Component } from 'react'
import { Query } from 'react-apollo'

import { THREAD_QUERY } from '../../../graphql/queries'
import SpecificThread from '../../../components/Social/SpecificThread/SpecificThread'

export default class Thread extends Component {
	render() {
		let name = this.props.match.params.name
		return (
			<Query query={THREAD_QUERY} variables={{ name }}>
				{({ loading, error, data }) => {
					if (loading) return <h1>LOADING</h1>
					if (error) {
						console.error(error)
						return null
					}
					return <SpecificThread thread={data.thread} />
				}}
			</Query>
		)
	}
}
