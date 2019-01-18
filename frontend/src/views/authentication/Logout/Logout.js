import React from 'react'
import { ApolloConsumer } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import { AUTH_TOKEN } from '../../../constants'

export default withRouter(({ history }) => (
	<ApolloConsumer>
		{client => {
			client.resetStore()
			localStorage.setItem(AUTH_TOKEN, '')
			history.push('/home')
			return null
		}}
	</ApolloConsumer>
))
