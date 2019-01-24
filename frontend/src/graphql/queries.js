import gql from 'graphql-tag'

export const POSTS_QUERY = gql`
	query PostsQuery {
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

export const SIMPLE_ME_QUERY = gql`
	query {
		me @client {
			username
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
			threadMemberships {
				edges {
					node {
						thread {
							name
						}
					}
				}
			}
		}
	}
`

export const SIMPLE_THREADS_QUERY = gql`
	query ThreadsQuery($isOpen: Boolean!) {
		threads(isOpen: $isOpen) {
			edges {
				node {
					id
					threadImage
					name
					description
				}
			}
		}
	}
`

export const THREAD_QUERY = gql`
	query ThreadQuery($name: String!) {
		thread(name: $name) {
			name
			description
			threadImage
			threadBanner
			memberships {
				edges {
					node {
						user {
							username
							bio
						}
						isAdmin
						nickname
					}
				}
			}
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
			admins {
				user {
					username
					bio
				}
				nickname
			}
		}
	}
`
