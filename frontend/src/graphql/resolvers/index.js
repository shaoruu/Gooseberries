import gql from 'graphql-tag'

const postQuery = gql`
	query {
		localPosts @client
	}
`

export default {
	Query: {},
	Mutation: {
		updateUserInfo: (
			_,
			{ username, email, image, bio, firstName, lastName, isStaff, dateJoined },
			{ cache }
		) => {
			cache.writeData({
				data: {
					userInfo: {
						__typename: 'userInfo',
						username: username,
						email: email,
						image: image,
						bio: bio,
						firstName: firstName,
						lastName: lastName,
						isStaff: isStaff,
						dateJoined: dateJoined
					}
				}
			})
			return null
		},
		refreshLocalPosts: (_, { posts }, { cache }) => {
			cache.writeData({
				data: {
					localPosts: { posts }
				}
			})
			return null
		}
	}
}
