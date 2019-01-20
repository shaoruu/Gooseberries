import React from 'react'

import Post from './Post/Post'
import classes from './Feed.module.css'

export default props => {
	let posts = props.posts
		.slice(0)
		.reverse()
		.map(
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
			{props.posts.length === 0 ? (
				<h1 style={{ textAlign: 'center' }}>NO POSTS</h1>
			) : (
				<ul>{posts}</ul>
			)}
		</div>
	)
}
