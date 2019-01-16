import React from 'react'
import { ApolloConsumer } from 'react-apollo'
import { Redirect } from 'react-router-dom'

import { AUTH_TOKEN } from '../../../constants'

export default () => (
	<ApolloConsumer>
		{client => {
			client.resetStore()
			localStorage.setItem(AUTH_TOKEN, '')
			return <Redirect to="/login" />
		}}
	</ApolloConsumer>
)
