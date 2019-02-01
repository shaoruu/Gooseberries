import React, { Component } from 'react'
import {
	HeadlineOneButton,
	HeadlineTwoButton,
	HeadlineThreeButton
} from 'draft-js-buttons'

export default class HeadlinesButtons extends Component {
	componentDidMount() {
		setTimeout(() => {
			window.addEventListener('click', this.onWindowClick)
		})
	}

	componentWillUnmount() {
		window.removeEventListener('click', this.onWindowClick)
	}

	onWindowClick = () => this.props.onOverrideContent(undefined)

	render() {
		const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton]
		return (
			<div>
				{buttons.map((Button, i) => (
					<Button key={i} {...this.props} />
				))}
			</div>
		)
	}
}
