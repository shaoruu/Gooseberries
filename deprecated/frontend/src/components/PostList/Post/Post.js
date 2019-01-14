import React from 'react'
import classes from './Post.module.css'

const post = props => {
	return (
		<li className={classes.Post} onClick={e => props.click(e, props.key)}>
			<h1>{props.title}</h1>
			<p>{props.content}</p>
			<div className={classes.Stamps}>
				<small>
					posted on {props.dateCreated} by {props.user.username}
				</small>
				<h4 className={classes.tag}>{props.thread.name}</h4>
			</div>
		</li>
	)
}

export default post
