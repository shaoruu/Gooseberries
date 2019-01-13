import React from 'react'
import Post from './Post/Post'

const postList = props => {
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
				/>
			)
		}
	)

	return <ul>{posts}</ul>
}

export default postList
