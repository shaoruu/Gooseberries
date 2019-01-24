import React, { Component } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import { Button, withStyles, Checkbox, FormControlLabel } from '@material-ui/core'

import classes from './PostEditor.module.css'

const styles = theme => ({
	publishButton: {}
})

class PostEditor extends Component {
	constructor() {
		super()

		this.state = {
			editorState: EditorState.createEmpty(),
			isPublished: true
		}
	}

	onChange = editorState => this.setState({ editorState })

	handleKeyCommand = (command, editorState) => {
		const newState = RichUtils.handleKeyCommand(editorState, command)
		if (newState) {
			this.onChange(newState)
			return 'handled'
		}
		return 'not-handled'
	}

	handleEditorClick = _ => {
		this.editor.focus()
	}

	handleTab = event => {
		event.preventDefault()
		// const { editorState } = this.state
	}

	toggleIsPublic = (_, checked) => {
		this.setState({ isPublished: checked })
	}

	render() {
		const styles = this.props.classes
		// console.log(this.state.editorState.getCurrentContent().getPlainText())
		return (
			<div className={classes.PostEditor_container}>
				<div className={classes.Editor} onClick={this.handleEditorClick}>
					<Editor
						editorState={this.state.editorState}
						onChange={this.onChange}
						handleKeyCommand={this.handleKeyCommand}
						onTab={this.handleTab}
						ref={editor => (this.editor = editor)}
					/>
				</div>
				<div className={classes.EditorSubmission}>
					<FormControlLabel
						control={
							<Checkbox
								checked={this.state.isPublished}
								onChange={(event, checked) => {
									this.toggleIsPublic(event, checked)
								}}
							/>
						}
						label="Set post as published?"
					/>
					<Button
						variant="outlined"
						color="primary"
						className={styles.PublishButton}
					>
						CREATE
					</Button>
				</div>
			</div>
		)
	}
}

export default withStyles(styles)(PostEditor)
