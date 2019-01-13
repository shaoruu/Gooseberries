import React from 'react'

const post = props => {
	return (
		<li>
			<h1>{props.title}</h1>
			<p>{props.content}</p>
			<small>
				posted on {props.dateCreated} by {props.user.username}
			</small>
			<h4>{props.thread.name}</h4>
		</li>
	)
}

export default post
