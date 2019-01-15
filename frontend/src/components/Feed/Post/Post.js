import React from 'react'
import classes from './Post.module.css'

export default props => (
	<div className={classes.Post_container}>
		<i className={classes.Post_tag}>
			{props.user.username} : {props.thread.name}
		</i>
		{/* <img src={props.user.image} alt="Profile Picture" /> */}
		<h1 className={classes.Post_title}>{props.title}</h1>
		<p className={classes.Post_content}>{props.content}</p>
		<small className={classes.Post_timestamp}>{props.dateCreated}</small>
	</div>
)
