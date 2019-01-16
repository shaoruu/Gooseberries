import React from 'react'
import classes from './Post.module.css'

export default props => {
	let profilePic = 'data:image/png;base64,' + props.user.image

	return (
		<div className={classes.Post_container}>
			<div className={classes.Post_header}>
				<img src={profilePic} alt="Profile Picture" className={classes.Post_image} />
				<h1>
					<i className={classes.Post_tag}>
						{props.user.username} > {props.thread.name}
					</i>
				</h1>
			</div>

			<div className={classes.Post_body}>
				<div className={classes.shadow} />
				<h1 className={classes.Post_title}>{props.title}</h1>
				<div className={classes.Post_content}>{props.content}</div>
			</div>

			<small className={classes.Post_timestamp}>{props.dateCreated}</small>
		</div>
	)
}
