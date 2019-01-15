import gql from 'graphql-tag'

export const POSTS_QUERY = gql`
	query PostQuery {
		posts {
			edges {
				node {
					uniqueIdentifier
					title
					content
					published
					user {
						username
						image
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

export const ME_QUERY = gql`
	query {
		me {
			username
			email
			image
			firstName
			lastName
			isStaff
			dateJoined
			image
			bio
		}
	}
`
