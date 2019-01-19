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

export const USER_QUERY = gql`
	query UserQuery($username: String!) {
		user(username: $username) {
			isStaff
			username
			email
			firstName
			lastName
			isStaff
			isActive
			bio
			dateOfBirth
			image
			lastLogin
			threadMemberships {
				edges {
					node {
						thread {
							name
							description
						}
						isAdmin
					}
				}
			}
		}
		posts {
			edges {
				node {
					title
					dateCreated
				}
			}
		}
	}
`

export const ME_QUERY = gql`
	query {
		me @client {
			username
			email
			image
			firstName
			lastName
			isStaff
			dateJoined
			bio
			token
		}
	}
`
