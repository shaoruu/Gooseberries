import React, { Component } from 'react'
import classes from './HeadlinesButton.module.css'

import { ReactComponent as Header } from '../../../assets/header.svg'
import HeadlinesPicker from './HeadlinesPicker/HeadlinesPicker'

export default class HeadlinesButton extends Component {
	onMouseDown = event => event.preventDefault()

	onClick = () => this.props.onOverrideContent(HeadlinesPicker)

	render() {
		return (
			<div onMouseDown={this.onMouseDown} className={classes.headlineButtonWrapper}>
				<button onClick={this.onClick} className={classes.headlineButton}>
					<Header className={classes.Header} />
				</button>
			</div>
		)
	}
}
