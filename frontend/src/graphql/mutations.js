import gql from 'graphql-tag'
import * as Yup from 'yup'

export const LOGIN_SCHEMA = Yup.object().shape({
	username: Yup.string().required('Username is required.'),
	password: Yup.string().required('Password is required.')
})

export const LOGIN_MUTATION = gql`
	mutation Login($username: String!, $password: String!) {
		login(input: { username: $username, password: $password }) {
			user {
				username
				email
				image
				firstName
				lastName
				isStaff
				dateJoined
				image
				bio
				token
			}
		}
	}
`
