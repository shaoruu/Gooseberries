import React, { Component } from 'react'
import createImagePlugin from 'draft-js-image-plugin'
import unionClassNames from 'union-class-names'

import classes from './AddImageForm.module.css'

const imagePlugin = createImagePlugin()

export default class AddImageForm extends Component {
	state = {
		url: '',
		isInvalid: false
	}

	componentDidMount() {
		this.input.focus()
	}

	onRef = node => (this.input = node)

	onChange = ({ target: { value } }) => {
		const nextState = { url: value }
		if (this.state.isInvalid && isLinkValid(value)) {
			nextState.isInvalid = false
		}
		this.setState(nextState)
	}

	onClose = () => this.props.onOverrideContent(undefined)

	onKeyDown = e => {
		if (e.key === 'Enter') {
			e.preventDefault()
			this.submit()
		} else if (e.key === 'Escape') {
			e.preventDefault()
			this.onClose()
		}
	}

	async submit() {
		const { getEditorState, setEditorState } = this.props
		let { url } = this.state
		if (!(await isLinkValid(url))) {
			this.setState({ isInvalid: true })
			return
		}
		setEditorState(imagePlugin.addImage(getEditorState(), url))
		this.onClose()
	}

	render() {
		const { url, isInvalid } = this.state
		const className = isInvalid
			? unionClassNames(classes.input, classes.inputInvalid)
			: classes.input
		return (
			<input
				className={className}
				onBlur={this.onClose}
				onChange={this.onChange}
				onKeyDown={this.onKeyDown}
				placeholder="Enter image URL"
				ref={this.onRef}
				type="text"
				value={url}
			/>
		)
	}
}

async function isLinkValid(url) {
	return await imageExists(url)
		.then(_ => true)
		.catch(err => {
			console.error(err)
			return false
		})
}

const imageExists = (url, timeoutT) =>
	new Promise(function(resolve, reject) {
		var timeout = timeoutT || 5000
		var timer,
			img = new Image()
		img.onerror = img.onabort = function() {
			clearTimeout(timer)
			reject(new Error('Failed to load image.'))
		}
		img.onload = function() {
			clearTimeout(timer)
			resolve(true)
		}
		timer = setTimeout(function() {
			// reset .src to invalid URL so it stops previous
			// loading, but doens't trigger new load
			img.src = 'NON-EXIST'
			reject(new Error('Image load timeout.'))
		}, timeout)
		img.src = url
	})
