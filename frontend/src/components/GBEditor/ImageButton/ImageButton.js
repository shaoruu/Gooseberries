import React, { Component } from 'react'

import classes from './ImageButton.module.css'
import { ReactComponent as ImageAdd } from '../../../assets/image.svg'
import AddImageForm from './AddImageForm/AddImageForm'

export default class ImageButton extends Component {
	onMouseDown = event => event.preventDefault()

	onClick = () => this.props.onOverrideContent(AddImageForm)

	render() {
		return (
			<div onMouseDown={this.onMouseDown} className={classes.imageButtonWrapper}>
				<button onClick={this.onClick} className={classes.imageButton}>
					<ImageAdd className={classes.ImageAdd} />
				</button>
			</div>
		)
	}
}
