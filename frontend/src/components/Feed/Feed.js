import React from 'react'

import Post from './Post/Post'
import classes from './Feed.module.css'

export default props => {
	let posts = props.posts.map(
		({ node: { uniqueIdentifier, title, content, dateCreated, user, thread } }) => {
			return (
				<Post
					key={uniqueIdentifier}
					title={title}
					content={content}
					dateCreated={dateCreated}
					user={user}
					thread={thread}
					click={props.clickPost}
				/>
			)
		}
	)
	return (
		<div className={classes.Feed_container}>
			<ul>{posts}</ul>
		</div>
	)
}
