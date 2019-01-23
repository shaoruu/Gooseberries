import React from 'react'

import classes from './SpecificThread.module.css'

export default props => {
	const {
		name,
		description,
		threadImage,
		memberships: { edges: members },
		posts: { edges: posts },
		admins
	} = props.thread
	console.log(members)
	console.log(posts)
	console.log(admins)
	console.log(threadImage)
	return (
		<div className={classes.SpecificThread_container}>
			<img src={threadImage} alt="Thread Profile" />
			<h1>{name}</h1>
			<h1>{description}</h1>
		</div>
	)
}
