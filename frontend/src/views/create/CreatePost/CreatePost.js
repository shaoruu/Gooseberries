import React, { Component } from 'react'
import { Button, withStyles, Checkbox, FormControlLabel } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
// import Markdown from 'react-markdown'

import classes from './CreatePost.module.css'
import GBEditor from '../../../components/GBEditor/GBEditor'

const styles = theme => ({
	publishButton: {}
})

class CreatePost extends Component {
	state = {
		isPublished: true
	}

	componentDidMount() {
		document.title = 'Create Post'
	}

	render() {
		// console.log(this.state.editorState)
		if (!this.props.location.state.threadName) return <Redirect push to="/home" />
		return (
			<div className={classes.CreatePost_container}>
				<div className={classes.Editor_title}>{`CREATE POST ON THREAD: ${
					this.props.location.state.threadName
				}`}</div>
				<div className={classes.EditorWrapper}>
					<GBEditor />
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

export default withStyles(styles)(CreatePost)
