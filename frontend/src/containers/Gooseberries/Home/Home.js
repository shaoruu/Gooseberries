import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import PostList from '../../../components/PostList/PostList'

const POSTS_QUERY = gql`
	{
		posts {
			edges {
				node {
					uniqueIdentifier
					title
					content
					published
					user {
						username
					}
					thread {
						name
						description
					}
					dateCreated
				}
			}
		}
	}
`

export default class Home extends Component {
	render() {
		return (
			<Query query={POSTS_QUERY}>
				{({ loading, error, data }) => {
					if (loading) return <p>Loading is taking place.</p>
					if (error) {
						console.log(error)
						return <p>An error has occurred</p>
					}
					return <PostList posts={data.posts.edges} />
				}}
			</Query>
		)
	}
}
