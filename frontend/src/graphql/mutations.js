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
				bio
				token
			}
		}
	}
`

export const REGISTER_SCHEMA = Yup.object().shape({
	username: Yup.string()
		.min(3, 'Username has to be at least three characters.')
		.required('Username is required.'),
	password: Yup.string()
		.min(8, 'Password must be at least 8 characters.')
		.required('Password is required.'),
	firstName: Yup.string().required('First name is required.'),
	lastName: Yup.string().required('Last name is required'),
	email: Yup.string().required('Email is required.'),
	dateOfBirth: Yup.date().required('Date of birth is required.')
})

export const REGISTER_MUTATION = gql`
	mutation Register(
		$username: String!
		$password: String!
		$firstName: String!
		$lastName: String!
		$email: String!
		$dateOfBirth: String!
	) {
		register(
			input: {
				username: $username
				password: $password
				firstName: $firstName
				lastName: $lastName
				email: $email
				dateOfBirth: $dateOfBirth
			}
		)
	}
`
