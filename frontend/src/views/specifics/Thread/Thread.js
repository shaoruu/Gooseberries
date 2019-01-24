import React, { Component } from 'react'
import { Query } from 'react-apollo'

import { THREAD_QUERY } from '../../../graphql/queries'
import SpecificThread from '../../../components/Social/SpecificThread/SpecificThread'

export default class Thread extends Component {
	render() {
		let name = this.props.match.params.name
		return <SpecificThread threadName={name} />
	}
}
