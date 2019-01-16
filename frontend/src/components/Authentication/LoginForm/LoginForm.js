import React from 'react'
import { Mutation } from 'react-apollo'

import classes from './LoginForm.module.css'
import { LOGIN_MUTATION, LOGIN_SCHEMA } from '../../../graphql/mutations'

export default props => {
	return (
		<div className={classes.LoginForm_container}>
			<Mutation mutation={LOGIN_MUTATION}>
				{(mutate, { client, loading, error, data }) => {
					console.log(data)
					return <h1>TEST</h1>
				}}
			</Mutation>
		</div>
	)
}
