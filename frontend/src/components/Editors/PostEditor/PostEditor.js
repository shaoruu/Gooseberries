import React, { Component } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'

import classes from './PostEditor.module.css'

class PostEditor extends Component {
	state = {
		editorState: EditorState.createEmpty()
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

	handleEditorClick = event => {
		this.editor.focus()
	}

	// handleTab = event => {
	// 	event.preventDefault()
	//    const { editorState } = this.props

	// }

	render() {
		console.log(this.state.editorState.getCurrentContent().getPlainText())
		return (
			<div className={classes.PostEditor_container}>
				<h1>Post Editor</h1>
				<div className={classes.Editor} onClick={this.handleEditorClick}>
					<Editor
						editorState={this.state.editorState}
						onChange={this.onChange}
						handleKeyCommand={this.handleKeyCommand}
						// onTab={this.handleTab}
						ref={editor => (this.editor = editor)}
					/>
				</div>
			</div>
		)
	}
}

export default PostEditor
