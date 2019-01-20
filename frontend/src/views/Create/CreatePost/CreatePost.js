import React, { Component } from 'react'
import Markdown from 'react-markdown'

import classes from './CreatePost.module.css'
import PostEditor from '../../../components/Editors/PostEditor/PostEditor'

class CreatePost extends Component {
	render() {
		// console.log(this.state.editorState)
		return (
			<div className={classes.CreatePost_container}>
				<PostEditor />
			</div>
		)
	}
}

export default CreatePost
