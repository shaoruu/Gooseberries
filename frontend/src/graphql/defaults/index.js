export default {
	me: {
		__typename: 'UserInfo',
		username: null,
		email: null,
		image: null,
		bio: null,
		firstName: null,
		lastName: null,
		isStaff: null,
		dateJoined: null,
		token: null,
		threadMemberships: {
			__typename: 'ThreadMemberNodeConnection',
			edges: []
		}
	},
	localPosts: []
	// posts: [],
	// threads: []
}
