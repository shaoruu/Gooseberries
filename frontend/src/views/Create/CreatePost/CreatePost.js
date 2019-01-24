import React, { Component } from 'react'
// import Markdown from 'react-markdown'

import classes from './CreatePost.module.css'
import PostEditor from '../../../components/Editors/PostEditor/PostEditor'

class CreatePost extends Component {
	render() {
		// console.log(this.state.editorState)
		return (
			<div className={classes.CreatePost_container}>
				<div className={classes.PostEditor_title}>Create Post</div>
				<PostEditor />
			</div>
		)
	}
}

export default CreatePost
