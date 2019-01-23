import React from 'react'
import { ApolloConsumer } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import { AUTH_TOKEN } from '../../../constants'

export default withRouter(({ history }) => (
	<ApolloConsumer>
		{client => {
			client.clearStore()
			localStorage.setItem(AUTH_TOKEN, '')
			history.push('/login')
			return null
		}}
	</ApolloConsumer>
))
