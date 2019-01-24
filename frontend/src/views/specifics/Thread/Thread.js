import React, { Component } from 'react'

import SpecificThread from '../../../components/Social/SpecificThread/SpecificThread'

export default class Thread extends Component {
	render() {
		let name = this.props.match.params.name
		return <SpecificThread threadName={name} />
	}
}
